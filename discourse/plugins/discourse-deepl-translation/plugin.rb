# frozen_string_literal: true

# name: discourse-deepl-translation
# about: Real-time peer-to-peer chat translation using DeepL API
# version: 1.0.0
# authors: ELEVATE Team
# url: https://github.com/avespinoza89/ELEVATE

enabled_site_setting :deepl_translation_enabled

register_asset 'stylesheets/deepl-translation.scss'

after_initialize do

  # Add user preference for language
  register_editable_user_custom_field :preferred_language

  DiscoursePluginRegistry.serialized_current_user_fields << "preferred_language"

  # Extend User model
  add_to_class(:user, :preferred_language) do
    custom_fields['preferred_language'] || 'en'
  end

  # Extend ChatMessage serializer to include translations
  add_to_serializer(:chat_message, :translated_content) do
    return nil unless SiteSetting.deepl_translation_enabled
    return nil unless scope&.user

    user_lang = scope.user.custom_fields['preferred_language'] || 'en'
    message_lang = detect_language(object.message)

    # Only translate if languages differ
    if user_lang != message_lang
      translate_message(object.message, message_lang, user_lang)
    else
      nil
    end
  end

  add_to_serializer(:chat_message, :original_language) do
    detect_language(object.message)
  end

  add_to_serializer(:chat_message, :include_translated_content?) do
    SiteSetting.deepl_translation_enabled &&
    scope&.user &&
    translated_content.present?
  end

  # Helper methods for serializer
  add_to_serializer(:chat_message, :translate_message) do |text, source_lang, target_lang|
    DeeplTranslationService.translate(text, source_lang, target_lang)
  rescue => e
    Rails.logger.error("DeepL translation error: #{e.message}")
    nil
  end

  add_to_serializer(:chat_message, :detect_language) do |text|
    DeeplTranslationService.detect_language(text)
  rescue => e
    Rails.logger.error("DeepL language detection error: #{e.message}")
    'en'
  end

  # Extend User serializer to include language preference
  add_to_serializer(:current_user, :preferred_language) do
    object.custom_fields['preferred_language'] || 'en'
  end

  # API endpoint to update language preference
  require_dependency 'application_controller'

  class ::DeeplTranslation::LanguagePreferenceController < ::ApplicationController
    requires_plugin 'discourse-deepl-translation'

    before_action :ensure_logged_in

    def update
      user = current_user
      language = params.require(:language)

      # Validate language code
      unless DeeplTranslationService::SUPPORTED_LANGUAGES.include?(language)
        return render json: { error: "Unsupported language" }, status: 400
      end

      user.custom_fields['preferred_language'] = language
      user.save_custom_fields(true)

      render json: { success: true, language: language }
    end

    def get
      render json: { language: current_user.custom_fields['preferred_language'] || 'en' }
    end
  end

  Discourse::Application.routes.append do
    put '/deepl-translation/preference' => 'deepl_translation/language_preference#update'
    get '/deepl-translation/preference' => 'deepl_translation/language_preference#get'
  end

end
