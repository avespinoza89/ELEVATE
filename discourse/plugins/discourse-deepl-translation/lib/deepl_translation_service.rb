# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

class DeeplTranslationService

  DEEPL_API_URL = "https://api-free.deepl.com/v2"
  DEEPL_API_URL_PRO = "https://api.deepl.com/v2"

  # Supported languages by DeepL
  SUPPORTED_LANGUAGES = %w[
    ar bg cs da de el en es et fi fr hu id it ja ko lt lv nb nl pl pt ro ru sk sl sv tr uk zh
  ].freeze

  LANGUAGE_NAMES = {
    'ar' => 'Arabic',
    'bg' => 'Bulgarian',
    'cs' => 'Czech',
    'da' => 'Danish',
    'de' => 'German',
    'el' => 'Greek',
    'en' => 'English',
    'es' => 'Spanish',
    'et' => 'Estonian',
    'fi' => 'Finnish',
    'fr' => 'French',
    'hu' => 'Hungarian',
    'id' => 'Indonesian',
    'it' => 'Italian',
    'ja' => 'Japanese',
    'ko' => 'Korean',
    'lt' => 'Lithuanian',
    'lv' => 'Latvian',
    'nb' => 'Norwegian',
    'nl' => 'Dutch',
    'pl' => 'Polish',
    'pt' => 'Portuguese',
    'ro' => 'Romanian',
    'ru' => 'Russian',
    'sk' => 'Slovak',
    'sl' => 'Slovenian',
    'sv' => 'Swedish',
    'tr' => 'Turkish',
    'uk' => 'Ukrainian',
    'zh' => 'Chinese'
  }.freeze

  class << self

    def translate(text, source_lang, target_lang)
      return text if text.blank?
      return text if source_lang == target_lang

      api_key = SiteSetting.deepl_api_key
      return nil if api_key.blank?

      # Use cache to avoid redundant API calls
      cache_key = "deepl_translation:#{Digest::MD5.hexdigest("#{text}:#{source_lang}:#{target_lang}")}"

      cached = Discourse.cache.read(cache_key)
      return cached if cached.present?

      begin
        url = api_url("/translate")

        params = {
          'text' => text,
          'target_lang' => normalize_language_code(target_lang),
          'auth_key' => api_key
        }

        # Add source language if specified and not auto-detect
        if source_lang.present? && source_lang != 'auto'
          params['source_lang'] = normalize_language_code(source_lang)
        end

        response = make_request(url, params)

        if response && response['translations'] && response['translations'].first
          translated_text = response['translations'].first['text']

          # Cache for 24 hours
          Discourse.cache.write(cache_key, translated_text, expires_in: 24.hours)

          translated_text
        else
          Rails.logger.warn("DeepL translation failed: No translation in response")
          nil
        end
      rescue => e
        Rails.logger.error("DeepL translation error: #{e.message}\n#{e.backtrace.join("\n")}")
        nil
      end
    end

    def detect_language(text)
      return 'en' if text.blank?

      api_key = SiteSetting.deepl_api_key
      return 'en' if api_key.blank?

      # Simple heuristic: if text contains mostly ASCII, assume English
      # This reduces API calls for language detection
      if text.ascii_only? && text.match?(/\A[a-zA-Z0-9\s.,!?'"()-]+\z/)
        return 'en'
      end

      begin
        # DeepL doesn't have a dedicated detect endpoint, but we can use
        # translation to EN and check detected_source_language
        url = api_url("/translate")

        params = {
          'text' => text.truncate(100), # Only send first 100 chars for detection
          'target_lang' => 'EN',
          'auth_key' => api_key
        }

        response = make_request(url, params)

        if response && response['translations'] && response['translations'].first
          detected = response['translations'].first['detected_source_language']
          detected ? detected.downcase : 'en'
        else
          'en'
        end
      rescue => e
        Rails.logger.error("DeepL language detection error: #{e.message}")
        'en'
      end
    end

    def usage_stats
      api_key = SiteSetting.deepl_api_key
      return nil if api_key.blank?

      begin
        url = api_url("/usage")
        params = { 'auth_key' => api_key }

        make_request(url, params, method: :get)
      rescue => e
        Rails.logger.error("DeepL usage stats error: #{e.message}")
        nil
      end
    end

    private

    def api_url(endpoint)
      base_url = SiteSetting.deepl_use_pro_api ? DEEPL_API_URL_PRO : DEEPL_API_URL
      "#{base_url}#{endpoint}"
    end

    def normalize_language_code(lang_code)
      # DeepL expects uppercase for English variants
      case lang_code.downcase
      when 'en', 'en-us', 'en-gb'
        'EN'
      when 'pt', 'pt-br', 'pt-pt'
        lang_code == 'pt-pt' ? 'PT-PT' : 'PT-BR'
      when 'zh', 'zh-hans', 'zh-cn'
        'ZH'
      else
        lang_code.upcase
      end
    end

    def make_request(url, params, method: :post)
      uri = URI.parse(url)

      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.open_timeout = 5
      http.read_timeout = 10

      request = if method == :post
        req = Net::HTTP::Post.new(uri.path)
        req.set_form_data(params)
        req
      else
        uri.query = URI.encode_www_form(params)
        Net::HTTP::Get.new(uri.request_uri)
      end

      response = http.request(request)

      if response.code.to_i == 200
        JSON.parse(response.body)
      else
        Rails.logger.error("DeepL API error: #{response.code} - #{response.body}")
        nil
      end
    end

  end

end
