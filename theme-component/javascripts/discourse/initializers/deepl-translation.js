import { withPluginApi } from "discourse/lib/plugin-api";

const DEEPL_API_KEY = "066ae965-3618-487e-93ca-a36365708c87:fx";
const DEEPL_FREE_API = "https://api-free.deepl.com/v2";

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
  console.log('[DeepL] Initializing with hardcoded settings...');

  const DeepLTranslator = {
    async translate(text, targetLang) {
      const url = `${DEEPL_FREE_API}/translate`;
      const params = new URLSearchParams({
        'text': text,
        'target_lang': targetLang.toUpperCase(),
        'auth_key': DEEPL_API_KEY
      });

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });

        if (!response.ok) {
          console.error('[DeepL] API error:', response.status);
          return null;
        }

        const data = await response.json();
        if (data.translations && data.translations[0]) {
          console.log('[DeepL] ✅ Translation successful');
          return {
            text: data.translations[0].text,
            detectedSourceLang: data.translations[0].detected_source_language?.toLowerCase()
          };
        }
        return null;
      } catch (error) {
        console.error('[DeepL] Error:', error);
        return null;
      }
    },

    getUserLanguage() {
      return localStorage.getItem('deepl_user_language') || 'en';
    },

    setUserLanguage(lang) {
      localStorage.setItem('deepl_user_language', lang);
    }
  };

  // Add language selector to page
  function addLanguageSelector() {
    if (document.getElementById('deepl-language-selector')) return;

    const selector = document.createElement('div');
    selector.id = 'deepl-language-selector';
    selector.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:#fff;padding:10px;border:2px solid #000;border-radius:5px;';
    selector.innerHTML = `
      <label style="font-weight:bold;margin-right:10px;">Language:</label>
      <select id="deepl-lang-select" style="padding:5px;">
        ${Object.entries(LANGUAGE_NAMES).map(([code, name]) =>
          `<option value="${code}" ${DeepLTranslator.getUserLanguage() === code ? 'selected' : ''}>${name}</option>`
        ).join('')}
      </select>
      <button id="deepl-translate-btn" style="margin-left:10px;padding:5px 10px;background:#007bff;color:#fff;border:none;border-radius:3px;cursor:pointer;">Translate Chat</button>
    `;

    document.body.appendChild(selector);

    document.getElementById('deepl-lang-select').addEventListener('change', (e) => {
      DeepLTranslator.setUserLanguage(e.target.value);
      console.log('[DeepL] Language set to:', e.target.value);
    });

    document.getElementById('deepl-translate-btn').addEventListener('click', async () => {
      console.log('[DeepL] Manual translation triggered');
      const messages = document.querySelectorAll('.chat-message-text, [class*="message"]');
      console.log('[DeepL] Found', messages.length, 'messages');

      const targetLang = DeepLTranslator.getUserLanguage();

      for (const msg of messages) {
        if (msg.dataset.deeplTranslated) continue;

        const originalText = msg.textContent.trim();
        if (!originalText || originalText.length < 3) continue;

        console.log('[DeepL] Translating:', originalText.substring(0, 30) + '...');
        const result = await DeepLTranslator.translate(originalText, targetLang);

        if (result && result.detectedSourceLang !== targetLang) {
          msg.dataset.deeplOriginal = originalText;
          msg.dataset.deeplTranslated = 'true';
          msg.textContent = result.text + ' 🌐';
          console.log('[DeepL] ✅ Translated from', result.detectedSourceLang);
        }
      }
    });
  }

  setTimeout(addLanguageSelector, 1000);

  // Make functions available in console for debugging
  window.DeepLTranslator = DeepLTranslator;
  window.testDeepL = async () => {
    console.log('Testing DeepL API...');
    const result = await DeepLTranslator.translate('Hello, how are you?', 'es');
    console.log('Result:', result);
  };

  console.log('[DeepL] ✅ Initialized. Click "Translate Chat" button or run testDeepL() in console.');
}

export default {
  name: "deepl-chat-translation",
  initialize() {
    withPluginApi("0.8.0", initializeDeeplTranslation);
  }
};
