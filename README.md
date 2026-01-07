# DeepL Chat Translation for Discourse

Real-time peer-to-peer chat translation for Discourse using DeepL API. Enables users speaking different languages to communicate seamlessly in chat by automatically translating messages to each user's preferred language.

## 🌍 What This Does

- **English speaker** types: "Hello, how are you?"
- **Spanish speaker** sees: "Hola, ¿cómo estás?" with translation badge
- **Spanish speaker** replies: "Muy bien, gracias"
- **English speaker** sees: "Very good, thanks" with translation badge
- Both can toggle to view original text

## 📦 Two Implementation Options

### Option 1: Full Plugin (Recommended for Production)

**Best for:** Self-hosted Discourse or Business tier hosted service

**Location:** `discourse/plugins/discourse-deepl-translation/`

**Features:**
- ✅ Secure server-side API key storage
- ✅ Server-side translation caching
- ✅ Better performance
- ✅ Production-ready
- ⚠️ Requires custom plugin installation

**Installation:** See [Plugin README](discourse/plugins/discourse-deepl-translation/README.md)

---

### Option 2: Theme Component (Testing on Hosted Discourse)

**Best for:** Testing on Discourse hosted services without Business tier

**Location:** `discourse/theme-component-deepl/`

**Features:**
- ✅ Works on standard Discourse hosted plans
- ✅ Easy 5-minute installation
- ✅ No server access required
- ⚠️ API key visible in browser (testing only)
- ⚠️ Client-side translation

**Installation:** See [Theme Component Installation Guide](discourse/theme-component-deepl/INSTALL.md)

---

## 🚀 Quick Start

### For Discourse Hosted Services (Testing)

```bash
# In Discourse Admin Panel:
Admin → Customize → Themes → Install

Repository URL: https://github.com/avespinoza89/ELEVATE.git
Branch: claude/discourse-deepl-translation-ZoFku
Remote Theme Path: discourse/theme-component-deepl
```

Then configure your DeepL API key in theme settings.

**→ [Full Installation Guide](discourse/theme-component-deepl/INSTALL.md)**

---

### For Self-Hosted Discourse

```bash
cd /var/discourse/plugins
git clone https://github.com/avespinoza89/ELEVATE.git
cd /var/discourse
./launcher rebuild app
```

Then configure DeepL API key in Admin → Settings → Plugins.

**→ [Full Plugin Documentation](discourse/plugins/discourse-deepl-translation/README.md)**

---

## 🔑 Getting a DeepL API Key

1. Sign up at [https://www.deepl.com/pro-api](https://www.deepl.com/pro-api)
2. Choose **Free** plan (500,000 characters/month) or **Pro** plan
3. Copy your API authentication key
4. Configure in Discourse settings

**Free API Limits:**
- 500,000 characters/month
- Approximately 100,000-250,000 short messages/month
- Perfect for testing and small communities

---

## 🌐 Supported Languages (30+)

Arabic • Bulgarian • Chinese • Czech • Danish • Dutch • English • Estonian • Finnish • French • German • Greek • Hungarian • Indonesian • Italian • Japanese • Korean • Latvian • Lithuanian • Norwegian • Polish • Portuguese • Romanian • Russian • Slovak • Slovenian • Spanish • Swedish • Turkish • Ukrainian

---

## 📂 Repository Structure

```
ELEVATE/
├── README.md                                    # This file
├── .gitignore                                   # Protects API keys
├── discourse/
│   ├── plugins/
│   │   └── discourse-deepl-translation/        # Full plugin (production)
│   │       ├── plugin.rb                       # Main plugin file
│   │       ├── lib/                            # DeepL API service
│   │       ├── assets/                         # JavaScript & CSS
│   │       ├── config/                         # Settings & locales
│   │       ├── README.md                       # Plugin documentation
│   │       └── SETUP_GUIDE.md                  # Setup instructions
│   │
│   └── theme-component-deepl/                  # Theme component (testing)
│       ├── about.json                          # Theme metadata
│       ├── settings.yml                        # Theme settings
│       ├── common/                             # JavaScript & CSS
│       ├── README.md                           # Component documentation
│       └── INSTALL.md                          # Installation guide
```

---

## 🎯 Which Option Should I Use?

| Scenario | Recommendation |
|----------|----------------|
| Testing on hosted Discourse | **Theme Component** (Option 2) |
| Self-hosted Discourse | **Full Plugin** (Option 1) |
| Discourse Business tier | **Full Plugin** (Option 1) |
| Production deployment | **Full Plugin** (Option 1) |
| Proof of concept | **Theme Component** (Option 2) |
| Small community (<10 users) | **Theme Component** (Option 2) |
| Large community (>50 users) | **Full Plugin** (Option 1) |
| Security-critical environment | **Full Plugin** (Option 1) |

---

## 🔒 Security Considerations

### Theme Component (Option 2)
- ⚠️ API key stored in browser-accessible theme settings
- ✅ OK for testing with DeepL Free API (rate-limited)
- ⚠️ Not recommended for production
- ✅ Can regenerate API key after testing

### Full Plugin (Option 1)
- ✅ API key stored securely server-side
- ✅ Never exposed to browsers
- ✅ Production-ready
- ✅ Better performance with server-side caching

---

## 📖 Documentation

### Theme Component (Hosted Services)
- **Quick Install:** [INSTALL.md](discourse/theme-component-deepl/INSTALL.md) - 5-minute setup
- **Full Docs:** [README.md](discourse/theme-component-deepl/README.md) - Complete documentation
- **Troubleshooting:** See README troubleshooting section

### Full Plugin (Self-Hosted/Business)
- **Setup Guide:** [SETUP_GUIDE.md](discourse/plugins/discourse-deepl-translation/SETUP_GUIDE.md) - Quick setup
- **Full Docs:** [README.md](discourse/plugins/discourse-deepl-translation/README.md) - Complete documentation
- **API Configuration:** [CONFIGURATION.md](discourse/plugins/discourse-deepl-translation/CONFIGURATION.md) - Detailed setup

---

## 🐛 Troubleshooting

### Theme Component Not Working?

1. **Refresh page** (Ctrl+Shift+R / Cmd+Shift+R)
2. **Check theme is enabled**: Admin → Customize → Themes
3. **Verify API key**: Theme Settings → deepl_api_key
4. **Check browser console**: F12 → Console tab, look for "[DeepL]" errors
5. **See detailed troubleshooting**: [Theme Component README](discourse/theme-component-deepl/README.md#troubleshooting)

### Plugin Not Working?

1. **Check plugin is enabled**: Admin → Plugins
2. **Verify API key**: Admin → Settings → Plugins → deepl_translation
3. **Check Rails logs**: Admin → Logs → Error Logs
4. **Rebuild Discourse**: `./launcher rebuild app`
5. **See detailed troubleshooting**: [Plugin README](discourse/plugins/discourse-deepl-translation/README.md#troubleshooting)

### Messages Not Translating?

**Common issues:**
- Users haven't set their preferred language
- Same language as message (no translation needed)
- API key incorrect or expired
- API quota exceeded (check https://www.deepl.com/account/usage)
- Translation disabled in settings

---

## 💡 Example Use Cases

### International Team Collaboration
- Team members speak English, Spanish, French
- Each person sets their preferred language
- Real-time collaboration without language barriers

### Multilingual Customer Support
- Support team speaks English
- Customers speak various languages
- Instant translation for seamless support

### Educational Communities
- Language learners can toggle between languages
- See both original and translated text
- Learn while communicating

### Global Communities
- Members from around the world
- Natural communication in native languages
- Automatic translation maintains context

---

## 🔧 Technical Details

### Architecture

**Theme Component:**
- Client-side JavaScript intercepts chat messages
- Calls DeepL API directly from browser
- Caches translations in localStorage
- Renders translation UI dynamically

**Full Plugin:**
- Server-side Ruby service handles API calls
- Chat message serializer adds translation data
- Frontend JavaScript displays translations
- Redis/database caching for performance

### API Usage Optimization

Both implementations include:
- ✅ Translation caching (24-hour TTL)
- ✅ Smart language detection
- ✅ Skip translation for same language
- ✅ Truncated text for language detection
- ✅ Configurable auto-translate behavior

---

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Test thoroughly (both plugin and theme component)
5. Commit with descriptive messages
6. Submit a pull request

---

## 📄 License

This project is released under the MIT License.

---

## 🆘 Support

### For Issues or Questions

- **GitHub Issues**: [Report a bug or request a feature](https://github.com/avespinoza89/ELEVATE/issues)
- **Discourse Meta**: [Community support](https://meta.discourse.org/)
- **DeepL Support**: [API documentation and support](https://support.deepl.com/)

### Before Opening an Issue

Please check:
1. Relevant README documentation (plugin or theme component)
2. Troubleshooting sections
3. Existing GitHub issues
4. DeepL API status and account usage

---

## ✨ Features

- ✅ Automatic peer-to-peer translation
- ✅ 30+ language support via DeepL
- ✅ User language preferences
- ✅ Translation badges showing source language
- ✅ Toggle to view original text
- ✅ Smart caching to reduce API calls
- ✅ Automatic language detection
- ✅ Responsive UI for mobile and desktop
- ✅ Configurable translation behavior
- ✅ Production-ready plugin version
- ✅ Testing-ready theme component

---

## 🎉 Get Started Now!

**Testing on Hosted Discourse?**
→ [Install Theme Component](discourse/theme-component-deepl/INSTALL.md) (5 minutes)

**Using Self-Hosted Discourse?**
→ [Install Full Plugin](discourse/plugins/discourse-deepl-translation/SETUP_GUIDE.md)

**Need Help Deciding?**
→ See "Which Option Should I Use?" section above

---

## 🙏 Credits

- **DeepL**: Translation API provided by [DeepL](https://www.deepl.com/)
- **Discourse**: Built for [Discourse](https://www.discourse.org/)
- **Community**: Thanks to all contributors and testers

---

**Start translating chat messages in minutes!** 🌍💬

© 2025 - MIT License
