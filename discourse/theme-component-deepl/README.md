# DeepL Chat Translation - Theme Component

**Real-time peer-to-peer chat translation for Discourse Hosted Services**

⚠️ **TESTING VERSION** - This theme component works on Discourse hosted services but has security limitations. For production use, consider the full plugin version with Business hosting.

## What This Does

Automatically translates chat messages to each user's preferred language using DeepL API:
- **User A** (English) sends: "Hello, how are you?"
- **User B** (Spanish) sees: "Hola, ¿cómo estás?" with translation badge
- **User B** replies in Spanish, User A sees it in English
- Both can toggle to see original text

## ⚠️ Security Warning

**This theme component stores your API key in browser-accessible settings.**

- ✅ **OK for testing** - Try it out, see if it works for you
- ❌ **NOT recommended for production** - API key is visible in browser
- 🔐 **For production**: Use the full plugin version with Business tier hosting

Your DeepL Free API includes 500,000 characters/month, which should be safe for testing even if exposed.

## Installation (5 Minutes)

### Step 1: Install Theme Component

1. **Log into your Discourse** (hosted service)
2. Go to **Admin** → **Customize** → **Themes**
3. Click **Install** → **From a Git repository**
4. Enter repository URL:
   ```
   https://github.com/avespinoza89/ELEVATE.git
   ```
5. Enter branch name (optional): `claude/discourse-deepl-translation-ZoFku`
6. Enter remote theme path:
   ```
   discourse/theme-component-deepl
   ```
7. Click **Install**
8. Wait for installation to complete (30-60 seconds)

### Step 2: Add to Your Theme

1. Go to **Admin** → **Customize** → **Themes**
2. Click on your **active theme** (usually "Default")
3. Click **Theme Components**
4. Find "DeepL Chat Translation" in the list
5. Click **Add** to include it in your theme
6. **Preview** or **Enable** the theme

### Step 3: Configure Settings

1. In the theme editor, click **Settings** (gear icon)
2. Configure the following:

   **deepl_api_key**: `066ae965-3618-487e-93ca-a36365708c87:fx`
   *(Your DeepL API key)*

   **deepl_use_free_api**: ✅ **Checked** (you're using Free API)

   **auto_translate_enabled**: ✅ **Checked** (automatic translation)

   **show_translation_badge**: ✅ **Checked** (show translation indicator)

   **show_original_toggle**: ✅ **Checked** (allow viewing original)

   **cache_translations**: ✅ **Checked** (save API calls)

   **default_language**: **en** (English as default)

3. Click **Save**

### Step 4: Test It!

1. Open Discourse in two different browsers (or incognito mode)
2. **Browser 1**: Click language selector, choose "English"
3. **Browser 2**: Click language selector, choose "Spanish"
4. Start a chat between the two users
5. **Browser 1** types: "Hello, how are you today?"
6. **Browser 2** should see: "Hola, ¿cómo estás hoy?" with translation badge ✨

## Where to Find the Language Selector

The language selector appears in the **chat drawer header** when you open a chat:

```
┌─────────────────────────────────┐
│ 🗨️ Chat               [X]       │
│ [🌐 Your Language: English ▼]   │  ← Language Selector Here
├─────────────────────────────────┤
│ Messages appear here...         │
└─────────────────────────────────┘
```

## Supported Languages (30+)

Arabic • Bulgarian • Chinese • Czech • Danish • Dutch • English • Estonian • Finnish • French • German • Greek • Hungarian • Indonesian • Italian • Japanese • Korean • Latvian • Lithuanian • Norwegian • Polish • Portuguese • Romanian • Russian • Slovak • Slovenian • Spanish • Swedish • Turkish • Ukrainian

## How It Works

### For Users:
1. Select your preferred language from dropdown in chat
2. Messages automatically translate to your language
3. Click "Show Original" to see the original text
4. Click "Show Translation" to switch back

### Behind the Scenes:
- JavaScript intercepts chat messages when they render
- Calls DeepL API directly from browser
- Caches translations in localStorage (reduces API calls)
- Displays translation with language badge
- Original text always preserved

## Troubleshooting

### Language selector doesn't appear
- **Refresh the page** (Ctrl+R / Cmd+R)
- **Clear cache**: Ctrl+Shift+R / Cmd+Shift+R
- **Check theme is enabled**: Admin → Customize → Themes
- **Check component is added**: Theme → Components tab

### Messages not translating
1. **Check browser console** for errors (F12 → Console tab)
2. **Verify API key** is entered correctly in settings (no extra spaces)
3. **Check language**: Make sure you selected a different language than the message
4. **API limit**: Check https://www.deepl.com/account/usage
5. **Try different browser** to rule out caching issues

### Translations are slow
- **First translation** always slower (cache miss)
- **Subsequent identical messages** should be instant (cached)
- **DeepL API** typically responds in < 1 second
- **Check network**: Browser DevTools → Network tab

### See "undefined" or errors
- **Theme not fully loaded**: Refresh page
- **Settings not saved**: Check theme settings were saved
- **Browser compatibility**: Try Chrome or Firefox

### API key error (401 Unauthorized)
- **Verify API key** is copied exactly: `066ae965-3618-487e-93ca-a36365708c87:fx`
- **Include `:fx` suffix** (important!)
- **Check key is active**: https://www.deepl.com/account

## Testing Checklist

- [ ] Theme component installed
- [ ] Component added to active theme
- [ ] API key configured in settings
- [ ] Language selector visible in chat
- [ ] Can select different languages
- [ ] Messages translate automatically
- [ ] Translation badge appears
- [ ] "Show Original" button works
- [ ] Cache reduces API calls (check DevTools Network tab)

## API Usage Monitoring

### Check Your Usage
1. Go to https://www.deepl.com/account/usage
2. View characters used this month
3. You have **500,000 characters/month** (Free)

### Estimate Messages
- Short message (20 chars): ~25,000 messages/month
- Medium message (50 chars): ~10,000 messages/month
- Long message (200 chars): ~2,500 messages/month

### Reduce API Calls
- ✅ Keep **cache_translations** enabled
- ✅ Cached messages don't count against limit
- ✅ Same messages between users share cache

## Security Considerations

### ⚠️ API Key Visibility
**Your API key is visible to anyone who:**
- Inspects the page source
- Opens browser DevTools
- Views theme component settings (if admin)

### Why This Is (Mostly) OK for Testing
- ✅ DeepL Free API has built-in rate limits
- ✅ Limited to 500k chars/month
- ✅ No billing/payment method attached
- ✅ Can regenerate key anytime
- ✅ Worst case: Someone uses your free quota

### What You Should Do
- 🔄 **Rotate key after testing** if you're concerned
- 📊 **Monitor usage** at https://www.deepl.com/account/usage
- 🔒 **For production**: Upgrade to Business hosting + full plugin
- ⏰ **Time-limited**: Only enable for testing period

## Upgrading to Production

Once testing is successful, **upgrade to the secure plugin version**:

### Option 1: Discourse Business Hosting
1. Contact Discourse sales: sales@discourse.org
2. Upgrade to Business tier
3. Request custom plugin installation
4. Use the full plugin from: `discourse/plugins/discourse-deepl-translation`

### Option 2: Self-Host Discourse
1. Set up self-hosted Discourse instance
2. Install full plugin with backend API protection
3. API key stored securely server-side
4. Follow plugin README for installation

## Uninstalling

1. **Admin** → **Customize** → **Themes**
2. Click your active theme
3. **Theme Components** tab
4. Find "DeepL Chat Translation"
5. Click **Remove**
6. Optionally delete the theme component entirely

## Support & Feedback

### Issues or Questions
- **GitHub Issues**: https://github.com/avespinoza89/ELEVATE/issues
- **Discourse Meta**: https://meta.discourse.org/
- **DeepL Support**: https://support.deepl.com/

### Share Your Results
Let us know if this works for you! Your feedback helps improve the component.

## Technical Details

### Files
```
theme-component-deepl/
├── about.json              # Theme metadata
├── settings.yml            # Theme settings
├── common/
│   ├── common.scss        # Styles for translation UI
│   └── head_tag.html      # JavaScript translation logic
└── README.md              # This file
```

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (may need refresh)

### API Calls
- **Per message**: 1 API call (if not cached)
- **Cached**: 0 API calls
- **Cache duration**: 24 hours
- **Cache storage**: Browser localStorage

### Performance
- **Translation time**: < 1 second (DeepL API)
- **Cache lookup**: Instant
- **Page load impact**: Minimal
- **Memory usage**: Low (localStorage)

## Example Scenarios

### Scenario 1: International Team
**Team**: English, Spanish, French speakers
**Setup**: Each person selects their language
**Result**: Everyone chats in native language, sees others' messages translated

### Scenario 2: Customer Support
**Support**: English-speaking team
**Customers**: Various languages
**Setup**: Support sets English, customers set their language
**Result**: Real-time multilingual support

### Scenario 3: Learning Community
**Members**: Learning different languages
**Setup**: Toggle between original and translation
**Result**: See both languages for learning

## Limitations

### Theme Component vs Plugin
| Feature | Theme Component (This) | Full Plugin |
|---------|----------------------|-------------|
| Works on hosted Discourse | ✅ Yes | ❌ Business only |
| API key security | ❌ Browser-visible | ✅ Server-side |
| Installation | ✅ Easy (5 min) | ⚠️ Needs admin |
| Performance | ✅ Good | ✅ Better |
| Caching | ✅ Browser only | ✅ Server + Browser |
| For production | ❌ Testing only | ✅ Yes |

### Known Issues
- Language selector may not appear immediately (refresh needed)
- Cache is per-browser (not shared across devices)
- API key visible in theme settings
- May conflict with other chat-modifying components

## FAQ

**Q: Can I use this in production?**
A: For testing only. Production use requires the full plugin version.

**Q: Will this translate old messages?**
A: Yes, it translates messages as they render in the chat.

**Q: Can I use DeepL Pro API?**
A: Yes, uncheck "deepl_use_free_api" setting and use your Pro key.

**Q: Does it translate forum posts?**
A: No, only chat messages. For posts, see Discourse Translator plugin.

**Q: What happens if I exceed 500k characters?**
A: DeepL API returns errors, messages show in original language.

**Q: Can I customize the translation badge?**
A: Yes, edit the CSS in common/common.scss.

**Q: Does it work on mobile?**
A: Yes, but you may need to refresh to see the language selector.

---

## Ready to Test!

You now have everything you need to test peer-to-peer chat translation on your Discourse hosted service.

**Next steps:**
1. ✅ Install theme component
2. ✅ Configure settings with your API key
3. ✅ Select your language in chat
4. ✅ Test with another user
5. 📊 Monitor API usage
6. 🚀 Decide if you want to upgrade to production

**Questions?** Open an issue on GitHub or ask on Discourse Meta!

---

© 2025 ELEVATE Commons - Unite. Learn. ELEVATE
