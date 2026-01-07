import { withPluginApi } from "discourse/lib/plugin-api";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

const PLUGIN_ID = "discourse-deepl-translation";

function initializeDeeplTranslation(api) {
  const siteSettings = api.container.lookup("service:site-settings");
  const currentUser = api.getCurrentUser();

  if (!siteSettings.deepl_translation_enabled) {
    return;
  }

  // Add language preference to user preferences
  api.modifyClass("controller:preferences/interface", {
    pluginId: PLUGIN_ID,

    actions: {
      save() {
        this.savePreferredLanguage();
        return this._super(...arguments);
      },
    },

    savePreferredLanguage() {
      const preferredLanguage = this.get("model.custom_fields.preferred_language");
      if (preferredLanguage) {
        ajax("/deepl-translation/preference", {
          type: "PUT",
          data: { language: preferredLanguage },
        }).catch(popupAjaxError);
      }
    },
  });

  // Decorate chat messages to show translations
  api.decorateChatMessage(function (chatMessage, chatChannel, decoratorHelper) {
    const message = decoratorHelper.message;

    if (!message.translated_content) {
      return;
    }

    const showOriginal = decoratorHelper.state?.showOriginal || false;
    const displayText = showOriginal ? message.message : message.translated_content;
    const originalLang = message.original_language || 'unknown';
    const targetLang = currentUser?.preferred_language || 'en';

    // Create translation indicator
    const translationBadge = document.createElement('div');
    translationBadge.className = 'deepl-translation-badge';
    translationBadge.innerHTML = `
      <span class="translation-indicator">
        <svg class="translation-icon" width="14" height="14" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
        </svg>
        Translated from ${getLanguageName(originalLang)}
      </span>
      ${siteSettings.deepl_show_original_option ? `
        <button class="btn-flat btn-small toggle-original" data-message-id="${message.id}">
          ${showOriginal ? 'Show Translation' : 'Show Original'}
        </button>
      ` : ''}
    `;

    return translationBadge;
  });

  // Handle toggle original/translation
  api.onPageChange(() => {
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('toggle-original')) {
        const messageId = e.target.getAttribute('data-message-id');
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);

        if (messageElement) {
          const isShowingOriginal = messageElement.classList.contains('showing-original');

          if (isShowingOriginal) {
            messageElement.classList.remove('showing-original');
            e.target.textContent = 'Show Original';
          } else {
            messageElement.classList.add('showing-original');
            e.target.textContent = 'Show Translation';
          }
        }
      }
    });
  });

  // Add user preference field
  api.modifyClass("model:user", {
    pluginId: PLUGIN_ID,

    preferredLanguageOptions() {
      return [
        { name: "Arabic", value: "ar" },
        { name: "Bulgarian", value: "bg" },
        { name: "Chinese", value: "zh" },
        { name: "Czech", value: "cs" },
        { name: "Danish", value: "da" },
        { name: "Dutch", value: "nl" },
        { name: "English", value: "en" },
        { name: "Estonian", value: "et" },
        { name: "Finnish", value: "fi" },
        { name: "French", value: "fr" },
        { name: "German", value: "de" },
        { name: "Greek", value: "el" },
        { name: "Hungarian", value: "hu" },
        { name: "Indonesian", value: "id" },
        { name: "Italian", value: "it" },
        { name: "Japanese", value: "ja" },
        { name: "Korean", value: "ko" },
        { name: "Latvian", value: "lv" },
        { name: "Lithuanian", value: "lt" },
        { name: "Norwegian", value: "nb" },
        { name: "Polish", value: "pl" },
        { name: "Portuguese", value: "pt" },
        { name: "Romanian", value: "ro" },
        { name: "Russian", value: "ru" },
        { name: "Slovak", value: "sk" },
        { name: "Slovenian", value: "sl" },
        { name: "Spanish", value: "es" },
        { name: "Swedish", value: "sv" },
        { name: "Turkish", value: "tr" },
        { name: "Ukrainian", value: "uk" },
      ];
    },
  });
}

function getLanguageName(code) {
  const languages = {
    'ar': 'Arabic',
    'bg': 'Bulgarian',
    'cs': 'Czech',
    'da': 'Danish',
    'de': 'German',
    'el': 'Greek',
    'en': 'English',
    'es': 'Spanish',
    'et': 'Estonian',
    'fi': 'Finnish',
    'fr': 'French',
    'hu': 'Hungarian',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'lt': 'Lithuanian',
    'lv': 'Latvian',
    'nb': 'Norwegian',
    'nl': 'Dutch',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'sv': 'Swedish',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'zh': 'Chinese'
  };
  return languages[code] || code;
}

export default {
  name: "deepl-translation",
  initialize() {
    withPluginApi("0.11.0", initializeDeeplTranslation);
  },
};
