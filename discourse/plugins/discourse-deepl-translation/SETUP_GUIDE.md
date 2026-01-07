# Quick Setup Guide - DeepL Translation Plugin

## 🚀 5-Minute Setup

### Step 1: Install Plugin in Discourse

**For Hosted Discourse:**
1. Go to **Admin** → **Customize** → **Themes and Components**
2. Click **Install** → **From a git repository**
3. Enter: `https://github.com/avespinoza89/ELEVATE.git`
4. Subdirectory: `discourse/plugins/discourse-deepl-translation`
5. Click **Install**

**For Self-Hosted Discourse:**
```bash
cd /var/discourse/plugins
git clone https://github.com/avespinoza89/ELEVATE.git
cd /var/discourse
./launcher rebuild app
```

### Step 2: Configure Plugin Settings

1. Go to **Admin** → **Settings**
2. Search for "deepl"
3. Configure these settings:

```
deepl_translation_enabled: ✅ ON
deepl_api_key: [Enter your DeepL API key]
deepl_use_pro_api: ❌ OFF (if using Free API)
deepl_show_original_option: ✅ ON
deepl_auto_translate: ✅ ON
deepl_cache_translations: ✅ ON
```

4. Click **Save**

### Step 3: Users Set Language Preference

Each user:
1. Click **Profile** → **Preferences** → **Interface**
2. Find **"Preferred Language for Chat Translation"**
3. Select their language (e.g., English, Spanish, etc.)
4. Click **Save Changes**

### Step 4: Test It!

1. Have User A (English) and User B (Spanish) open a chat
2. User A types: "Hello, how are you?"
3. User B should see: "Hola, ¿cómo estás?" with a translation badge
4. Success! 🎉

---

## 🔑 Getting Your DeepL API Key

1. Visit: https://www.deepl.com/pro-api
2. Click **Sign up for free**
3. Verify your email
4. Go to **Account** → **API Keys**
5. Copy your API key (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx`)
6. Paste it in the Discourse plugin settings

**Free Plan includes:**
- 500,000 characters/month
- ~100,000 - 250,000 messages/month
- No credit card required

---

## 📊 Supported Languages

Arabic • Bulgarian • Chinese • Czech • Danish • Dutch • English • Estonian • Finnish • French • German • Greek • Hungarian • Indonesian • Italian • Japanese • Korean • Latvian • Lithuanian • Norwegian • Polish • Portuguese • Romanian • Russian • Slovak • Slovenian • Spanish • Swedish • Turkish • Ukrainian

---

## ❓ Troubleshooting

### Messages not translating?

**Check:**
- ✅ Plugin is enabled in settings
- ✅ API key is entered correctly
- ✅ User has set a preferred language
- ✅ Users speak different languages
- ✅ Haven't exceeded 500k character limit

**Fix:**
1. Check **Admin** → **Logs** for errors
2. Verify API key at https://www.deepl.com/account
3. Test API key with a simple message

### Can't find the language setting?

1. Make sure plugin is installed and enabled
2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
3. Try a different browser
4. Rebuild Discourse: `./launcher rebuild app`

### Translation is slow?

- Enable caching: `deepl_cache_translations: ON`
- DeepL API is fast (<1s), check your network
- First translation is slower (cache miss), subsequent are instant

---

## 💡 Pro Tips

1. **Enable Caching**: Saves API calls and improves speed
2. **Monitor Usage**: Check https://www.deepl.com/account/usage monthly
3. **Show Original**: Let users toggle to see original text
4. **Auto-Translate**: Keep ON for seamless experience
5. **Code Blocks**: Keep OFF to avoid translating code

---

## 🔒 Security Notes

- ⚠️ Never commit API keys to Git
- 🔐 API keys are stored securely in Discourse database
- 🌐 Use HTTPS for your Discourse site
- 🔄 Rotate API keys periodically

---

## 📚 Additional Resources

- **Full Documentation**: See `README.md` in the plugin directory
- **Plugin Issues**: https://github.com/avespinoza89/ELEVATE/issues
- **DeepL Support**: https://support.deepl.com/
- **Discourse Meta**: https://meta.discourse.org/

---

## 🎯 Example Use Case

**Scenario**: International team collaboration

**Team Members:**
- Maria (Spanish speaker in Madrid)
- John (English speaker in New York)
- Yuki (Japanese speaker in Tokyo)

**How it works:**
1. Each sets their preferred language in preferences
2. Maria types in Spanish: "Hola, ¿cómo va el proyecto?"
3. John sees: "Hello, how is the project going?"
4. Yuki sees: "こんにちは、プロジェクトはどうですか？"
5. Everyone communicates naturally in their own language!

---

**Ready to enable global communication!** 🌍💬

Need help? Check `CONFIGURATION.md` for detailed setup or open an issue on GitHub.
