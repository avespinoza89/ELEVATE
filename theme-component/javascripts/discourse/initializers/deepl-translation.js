import { withPluginApi } from "discourse/lib/plugin-api";

const DEEPL_FREE_API = "https://api-free.deepl.com/v2";
const DEEPL_PRO_API = "https://api.deepl.com/v2";

const LANGUAGE_NAMES = {
  'ar': 'Arabic', 'bg': 'Bulgarian', 'cs': 'Czech', 'da': 'Danish',
  'de': 'German', 'el': 'Greek', 'en': 'English', 'es': 'Spanish',
  'et': 'Estonian', 'fi': 'Finnish', 'fr': 'French', 'hu': 'Hungarian',
  'id': 'Indonesian', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean',
  'lt': 'Lithuanian', 'lv': 'Latvian', 'nb': 'Norwegian', 'nl': 'Dutch',
  'pl': 'Polish', 'pt': 'Portuguese', 'ro': 'Romanian', 'ru': 'Russian',
  'sk': 'Slovak', 'sl': 'Slovenian', 'sv': 'Swedish', 'tr': 'Turkish',
  'uk': 'Ukrainian', 'zh': 'Chinese'
};

function initializeDeeplTranslation(api) {
  console.log('[DeepL] Plugin initializing...');

  // Get theme settings - try multiple methods
  let themeSettings = null;

  try {
    // Method 1: Check if settings object exists (global)
    if (typeof settings !== 'undefined') {
      themeSettings = settings;
      console.log('[DeepL] Using global settings');
    }
  } catch (e) {
    console.log('[DeepL] Global settings not available');
  }

  // Method 2: Try to get from site settings
  try {
    const siteSettings = api.container.lookup("service:site-settings");
    if (siteSettings) {
      console.log('[DeepL] Site settings available');
    }
  } catch (e) {
    console.log('[DeepL] Site settings not accessible');
  }

  // If no settings found, log error and exit
  if (!themeSettings) {
    console.error('[DeepL] ❌ Theme settings not accessible. Theme component may not be loaded correctly.');
    console.error('[DeepL] Make sure the theme component is added to your active theme.');
    return;
  }

  console.log('[DeepL] ✅ Settings loaded');
  console.log('[DeepL] API Key configured:', themeSettings.deepl_api_key ? 'Yes (***' + themeSettings.deepl_api_key.slice(-4) + ')' : 'No');
  console.log('[DeepL] Auto-translate:', themeSettings.auto_translate_enabled);
  console.log('[DeepL] Default language:', themeSettings.default_language);

  // Translation service
  const DeepLTranslator = {

    getApiUrl() {
      return themeSettings.deepl_use_free_api ? DEEPL_FREE_API : DEEPL_PRO_API;
    },

    async translate(text, targetLang, sourceLang = null) {
      const apiKey = themeSettings.deepl_api_key;

      if (!apiKey || apiKey.trim() === '') {
        console.error('[DeepL] ❌ API key not configured in theme settings');
        return null;
      }

      // Check cache first
      if (themeSettings.cache_translations) {
        const cached = this.getCached(text, targetLang);
        if (cached) {
          console.log('[DeepL] ✅ Using cached translation');
          return cached;
        }
      }

      const url = `${this.getApiUrl()}/translate`;
      const params = new URLSearchParams({
        'text': text,
        'target_lang': this.normalizeLanguageCode(targetLang),
        'auth_key': apiKey
      });

      if (sourceLang) {
        params.append('source_lang', this.normalizeLanguageCode(sourceLang));
      }

      console.log('[DeepL] Translating to:', targetLang);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString()
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[DeepL] ❌ API error:', response.status, errorText);
          return null;
        }

        const data = await response.json();

        if (data.translations && data.translations[0]) {
          console.log('[DeepL] ✅ Translation successful');
          const translation = {
            text: data.translations[0].text,
            detectedSourceLang: data.translations[0].detected_source_language?.toLowerCase() || sourceLang
          };

          // Cache the translation
          if (themeSettings.cache_translations) {
            this.setCached(text, targetLang, translation);
          }

          return translation;
        }

        console.error('[DeepL] ❌ No translation in response');
        return null;
      } catch (error) {
        console.error('[DeepL] ❌ Translation error:', error);
        return null;
      }
    },

    normalizeLanguageCode(code) {
      const normalized = code.toLowerCase();
      if (normalized === 'en') return 'EN';
      if (normalized === 'pt') return 'PT-BR';
      if (normalized === 'zh') return 'ZH';
      return code.toUpperCase();
    },

    getCacheKey(text, targetLang) {
      return `deepl_cache_${btoa(text).substring(0, 50)}_${targetLang}`;
    },

    getCached(text, targetLang) {
      try {
        const cached = localStorage.getItem(this.getCacheKey(text, targetLang));
        if (cached) {
          const data = JSON.parse(cached);
          // Cache valid for 24 hours
          if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
            return data.translation;
          }
        }
      } catch (e) {
        console.warn('[DeepL] Cache read error:', e);
      }
      return null;
    },

    setCached(text, targetLang, translation) {
      try {
        localStorage.setItem(this.getCacheKey(text, targetLang), JSON.stringify({
          translation,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('[DeepL] Cache write error:', e);
      }
    },

    getUserLanguage() {
      return localStorage.getItem('deepl_user_language') || themeSettings.default_language || 'en';
    },

    setUserLanguage(lang) {
      localStorage.setItem('deepl_user_language', lang);
    }
  };

  console.log('[DeepL] 🔍 Checking for chat elements...');

  // Initialize language selector on page change
  api.onPageChange(() => {

    // Add language selector
    if (api.getCurrentUser()) {
      const addLanguageSelector = () => {
        const existingSelector = document.getElementById('deepl-language-selector');
        if (existingSelector) {
          console.log('[DeepL] Language selector already exists');
          return;
        }

        // Try multiple chat selectors for different Discourse versions
        const chatContainer = document.querySelector('.chat-drawer') ||
                            document.querySelector('.chat-container') ||
                            document.querySelector('[class*="chat"]');

        if (!chatContainer) {
          console.log('[DeepL] ⏳ Chat container not found yet');
          return;
        }

        console.log('[DeepL] ✅ Found chat container:', chatContainer.className);

        const selectorHtml = `
          <div id="deepl-language-selector" class="deepl-language-selector">
            <label for="deepl-lang-select">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
              Your Language:
            </label>
            <select id="deepl-lang-select" class="deepl-lang-select">
              ${Object.entries(LANGUAGE_NAMES).map(([code, name]) =>
                `<option value="${code}" ${DeepLTranslator.getUserLanguage() === code ? 'selected' : ''}>${name}</option>`
              ).join('')}
            </select>
          </div>
        `;

        // Try to find header
        const header = chatContainer.querySelector('.chat-drawer-header') ||
                      chatContainer.querySelector('.chat-header') ||
                      chatContainer.querySelector('[class*="header"]');

        if (header && !document.getElementById('deepl-language-selector')) {
          header.insertAdjacentHTML('beforeend', selectorHtml);
          console.log('[DeepL] ✅ Language selector added');

          const select = document.getElementById('deepl-lang-select');
          if (select) {
            select.addEventListener('change', (e) => {
              DeepLTranslator.setUserLanguage(e.target.value);
              console.log('[DeepL] 🌍 Language changed to:', e.target.value);
              alert('Language changed to ' + LANGUAGE_NAMES[e.target.value] + '. Reload page to see translations.');
            });
          }
        } else {
          console.log('[DeepL] ⚠️ Could not find chat header to inject selector');
        }
      };

      // Try to add selector immediately
      setTimeout(() => {
        console.log('[DeepL] Attempting to add language selector...');
        addLanguageSelector();
      }, 1000);

      // Also watch for chat opening
      const observer = new MutationObserver(() => {
        addLanguageSelector();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      console.log('[DeepL] No user logged in, skipping language selector');
    }
  });

  console.log('[DeepL] ✅ Plugin initialized successfully');
  console.log('[DeepL] Waiting for chat to open...');

  // Test function available in console
  window.testDeepLTranslation = async function() {
    console.log('=== DeepL Translation Test ===');
    const result = await DeepLTranslator.translate('Hello, how are you?', 'es');
    console.log('Translation result:', result);
    if (result) {
      console.log('✅ Translation working! Result:', result.text);
    } else {
      console.log('❌ Translation failed');
    }
  };

  console.log('[DeepL] 💡 Test translation by running: testDeepLTranslation()');
}

export default {
  name: "deepl-chat-translation",
  initialize() {
    console.log('[DeepL] Theme component loading...');
    withPluginApi("0.8.0", initializeDeeplTranslation);
  }
};
