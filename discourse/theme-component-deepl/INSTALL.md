# Quick Install Guide - DeepL Chat Translation Theme Component

## ⚡ 5-Minute Installation for Discourse Hosted Services

### What You'll Get
- ✅ Real-time chat translation
- ✅ Works on Discourse hosted service (no Business tier needed)
- ✅ 30+ languages supported
- ✅ Simple language selector in chat
- ⚠️ For testing only (API key visible in browser)

---

## Step 1: Install Theme Component (2 min)

1. **Login to your Discourse** admin panel
2. Navigate: **Admin** → **Customize** → **Themes**
3. Click **Install** button
4. Select **From a Git repository**
5. Fill in the form:

   ```
   Repository URL: https://github.com/avespinoza89/ELEVATE.git
   Branch: claude/discourse-deepl-translation-ZoFku
   Remote Theme Path: discourse/theme-component-deepl
   ```

6. Click **Install**
7. Wait 30-60 seconds for installation

---

## Step 2: Add to Active Theme (1 min)

1. Go to **Admin** → **Customize** → **Themes**
2. Click your **active theme** (usually "Default")
3. Click **Theme Components** tab
4. Find **"DeepL Chat Translation"** in the list
5. Click **Add** to attach it to your theme
6. Theme is now active!

---

## Step 3: Configure Settings (2 min)

1. In the theme list, click on **"DeepL Chat Translation"**
2. Click **Settings** (gear icon ⚙️)
3. Enter these values:

| Setting | Value |
|---------|-------|
| `deepl_api_key` | `066ae965-3618-487e-93ca-a36365708c87:fx` |
| `deepl_use_free_api` | ✅ **Checked** |
| `auto_translate_enabled` | ✅ **Checked** |
| `show_translation_badge` | ✅ **Checked** |
| `show_original_toggle` | ✅ **Checked** |
| `cache_translations` | ✅ **Checked** |
| `default_language` | **en** |

4. Click **Save Changes**

---

## Step 4: Test Translation (2 min)

### Test with Two Browsers

**Browser 1** (English user):
1. Open Discourse chat
2. Look for language selector at top of chat: **[🌐 Your Language: ▼]**
3. Select **English**
4. Type message: "Hello, how are you today?"

**Browser 2** (Spanish user):
1. Open Discourse chat in different browser/incognito
2. Select **Spanish** from language selector
3. View Browser 1's message
4. Should see: **"Hola, ¿cómo estás hoy?"** with translation badge 🎉

**Success!** If you see the translation, it's working!

---

## Troubleshooting

### Can't see language selector?
- **Refresh page**: Ctrl+R (Windows) or Cmd+R (Mac)
- **Clear cache**: Ctrl+Shift+R or Cmd+Shift+R
- **Check theme is enabled**: Admin → Themes

### Messages not translating?
1. Open browser console (F12 → Console tab)
2. Look for errors with "[DeepL]" prefix
3. Check API key is entered exactly (including `:fx`)
4. Verify you selected different language than message

### Still not working?
1. Check your API key at: https://www.deepl.com/account
2. Verify key is active and has quota remaining
3. Try a different browser
4. See full README.md for detailed troubleshooting

---

## What's Next?

### Monitor Usage
- Check API usage: https://www.deepl.com/account/usage
- You have 500,000 characters/month (Free)
- Translations are cached to save quota

### Customize
- Edit translation badge text in theme component
- Change default language in settings
- Adjust which languages appear in dropdown

### Upgrade to Production
Once testing is successful:
- Contact Discourse about Business hosting
- Install full secure plugin version
- API key protected server-side

---

## Quick Reference

### Supported Languages
English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Chinese, Korean, Arabic, Dutch, Polish, Swedish, Turkish, Czech, Danish, Finnish, Greek, Hungarian, Indonesian, Norwegian, Romanian, Slovak, Ukrainian, Bulgarian, Estonian, Lithuanian, Latvian, Slovenian

### Settings Explained
- **deepl_api_key**: Your DeepL API authentication key
- **deepl_use_free_api**: Check for Free API, uncheck for Pro
- **auto_translate_enabled**: Automatically translate (vs manual click)
- **show_translation_badge**: Show "Translated from X" indicator
- **show_original_toggle**: Allow users to see original text
- **cache_translations**: Save translations to reduce API calls
- **default_language**: Language for users who haven't selected one

### Keyboard Shortcuts (when in chat)
- **Refresh page**: See language selector
- **F12**: Open browser console to debug
- **Ctrl+Shift+R**: Hard refresh (clear cache)

---

## Need Help?

- 📖 **Full Documentation**: See README.md
- 🐛 **Report Issues**: https://github.com/avespinoza89/ELEVATE/issues
- 💬 **Discourse Community**: https://meta.discourse.org/
- 🌐 **DeepL Support**: https://support.deepl.com/

---

**You're all set!** Start chatting in multiple languages! 🌍💬
