# Discourse DeepL Translation Plugin

Real-time peer-to-peer chat translation for Discourse using the DeepL API. This plugin enables users who speak different languages to communicate seamlessly in chat by automatically translating messages to each user's preferred language.

## Features

- **Automatic Translation**: Messages are automatically translated to the viewer's preferred language
- **Peer-to-Peer**: Each user sees messages in their own language without affecting others
- **Show Original**: Users can toggle to see the original message text
- **Language Detection**: Automatically detects the source language of messages
- **Caching**: Reduces API calls by caching translations
- **30+ Languages**: Supports all languages offered by DeepL
- **User Preferences**: Each user sets their preferred language in their profile

## How It Works

1. **User A** (speaks English) sends a chat message: "Hello, how are you?"
2. **User B** (speaks Spanish) sees: "Hola, ¿cómo estás?" with a badge indicating it was translated
3. **User B** responds in Spanish: "Muy bien, gracias"
4. **User A** sees: "Very well, thank you" with a translation badge

Both users can click "Show Original" to see the message in its original language.

## Installation

### 1. Get a DeepL API Key

1. Sign up for a DeepL API account at [https://www.deepl.com/pro-api](https://www.deepl.com/pro-api)
2. Choose the **Free** plan (500,000 characters/month) or **Pro** plan
3. Copy your API authentication key

### 2. Install the Plugin

#### Option A: From Repository (Recommended for hosted Discourse)

1. Go to **Admin** > **Plugins** in your Discourse instance
2. Click **Install Plugin**
3. Enter the repository URL:
   ```
   https://github.com/avespinoza89/ELEVATE.git
   ```
4. Specify the subdirectory:
   ```
   discourse/plugins/discourse-deepl-translation
   ```
5. Click **Install**

#### Option B: Manual Installation (Self-hosted)

1. SSH into your Discourse server
2. Navigate to the plugins directory:
   ```bash
   cd /var/discourse/plugins
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/avespinoza89/ELEVATE.git
   cd ELEVATE/discourse/plugins/discourse-deepl-translation
   ```
4. Rebuild Discourse:
   ```bash
   cd /var/discourse
   ./launcher rebuild app
   ```

### 3. Configure the Plugin

1. Go to **Admin** > **Settings** > **Plugins**
2. Find **deepl translation** in the settings
3. Configure the following:

   - **deepl_translation_enabled**: ✅ Enable
   - **deepl_api_key**: Paste your DeepL API key
   - **deepl_use_pro_api**: Enable if using DeepL Pro (disable for Free)
   - **deepl_show_original_option**: ✅ Enable (recommended)
   - **deepl_auto_translate**: ✅ Enable for automatic translation
   - **deepl_cache_translations**: ✅ Enable (recommended to reduce API calls)

4. Click **Save Changes**

### 4. User Setup

Each user needs to set their preferred language:

1. Click on your **profile picture** > **Preferences**
2. Go to the **Interface** tab
3. Find **Preferred Language for Chat Translation**
4. Select your language from the dropdown
5. Click **Save Changes**

## Supported Languages

Arabic, Bulgarian, Chinese, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Indonesian, Italian, Japanese, Korean, Latvian, Lithuanian, Norwegian, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish, Turkish, Ukrainian

## Usage

Once configured, the plugin works automatically:

1. **Send messages normally** in your language
2. **View translated messages** with a translation badge showing the source language
3. **Click "Show Original"** to see the message in its original language
4. **Click "Show Translation"** to switch back to the translated version

## API Usage and Limits

### DeepL Free API
- **500,000 characters/month** included
- Sufficient for most small to medium communities
- Approximately 100,000 - 250,000 short messages per month

### DeepL Pro API
- Pay-as-you-go pricing
- Higher rate limits
- Better for large communities

### Reducing API Calls

The plugin includes several features to minimize API usage:

1. **Caching**: Translations are cached for 24 hours
2. **Smart Detection**: English ASCII text is auto-detected without API calls
3. **Same Language Skip**: Messages in the user's language are not translated
4. **Truncated Detection**: Only first 100 characters used for language detection

## Troubleshooting

### Messages Not Translating

1. **Check API key**: Verify your DeepL API key is correct
2. **Check settings**: Ensure `deepl_translation_enabled` is enabled
3. **Check user preference**: User must have a preferred language set
4. **Check logs**: Look in Admin > Logs for DeepL API errors
5. **API limit**: You may have exceeded your monthly character limit

### Translation Showing for Same Language

The plugin detects the source language. If detection fails, it defaults to English. This may cause unnecessary translations. Check the Rails logs for detection errors.

### Slow Performance

1. **Enable caching**: Make sure `deepl_cache_translations` is enabled
2. **Check API response time**: DeepL typically responds in < 1 second
3. **Network issues**: Ensure your server can reach DeepL's API endpoints

## Privacy and Security

- **API Key Security**: API keys are stored securely and never exposed to clients
- **Original Messages**: Original message text is preserved in the database
- **Translation Privacy**: Translations are sent through DeepL's API (see [DeepL Privacy Policy](https://www.deepl.com/privacy))
- **Caching**: Cached translations are stored in Redis/database cache

## Development

### File Structure

```
discourse-deepl-translation/
├── plugin.rb                          # Main plugin file
├── README.md                          # This file
├── config/
│   ├── settings.yml                   # Plugin settings
│   └── locales/
│       ├── client.en.yml              # Client-side translations
│       └── server.en.yml              # Server-side translations
├── lib/
│   └── deepl_translation_service.rb   # DeepL API service
├── assets/
│   ├── javascripts/
│   │   └── discourse/
│   │       ├── initializers/
│   │       │   └── deepl-translation.js
│   │       └── connectors/
│   │           └── user-preferences-interface/
│   │               └── preferred-language.hbs
│   └── stylesheets/
│       └── deepl-translation.scss     # Plugin styles
```

### Testing Locally

1. Use [Discourse Development Environment](https://meta.discourse.org/t/beginners-guide-to-install-discourse-on-macos-for-development/15772)
2. Symlink the plugin:
   ```bash
   ln -s /path/to/discourse-deepl-translation /path/to/discourse/plugins/
   ```
3. Get a DeepL Free API key for testing
4. Configure settings in Admin panel

### API Reference

**Endpoints:**

- `PUT /deepl-translation/preference` - Update user language preference
  - Params: `{ language: 'es' }`

- `GET /deepl-translation/preference` - Get current user language preference

**Serializer Fields:**

- `ChatMessage#translated_content` - The translated message text
- `ChatMessage#original_language` - Detected source language code
- `User#preferred_language` - User's preferred language for translations

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:

- **Plugin Issues**: [GitHub Issues](https://github.com/avespinoza89/ELEVATE/issues)
- **Discourse Questions**: [Discourse Meta](https://meta.discourse.org/)
- **DeepL API**: [DeepL Support](https://support.deepl.com/)

## License

This plugin is released under the MIT License.

## Credits

- **DeepL**: Translation API provided by [DeepL](https://www.deepl.com/)
- **Discourse**: Built for [Discourse](https://www.discourse.org/)
- **ELEVATE Commons**: Developed for the ELEVATE community platform

---

© 2025 ELEVATE Commons - Unite. Learn. ELEVATE
