# Debugging Guide - DeepL Chat Translation

## Is the Theme Component Actually Working?

Let's check step by step what's happening.

### Step 1: Verify Theme is Active

1. Go to **Admin** → **Customize** → **Themes**
2. Find "DeepL Chat Translation" in the list
3. Check that it's **attached to your active theme**
4. Look for a **green checkmark** or "Active" indicator

### Step 2: Check JavaScript is Loading

1. Open your Discourse site
2. Press **F12** to open browser DevTools
3. Go to **Console** tab
4. Paste this command and press Enter:

```javascript
console.log('Settings:', settings);
console.log('DeepL API Key:', settings?.deepl_api_key);
```

**What you should see:**
- If theme is loaded: Shows settings object with your API key
- If NOT loaded: `settings is not defined` error

### Step 3: Check if Chat Exists

In the same console, run:

```javascript
document.querySelector('.chat-drawer')
```

**What you should see:**
- If chat exists: Shows HTML element
- If NULL: Chat isn't rendered or uses different selectors

### Step 4: Check for JavaScript Errors

1. Keep console open
2. Open a chat conversation
3. Look for any errors in red, especially ones mentioning:
   - `[DeepL]`
   - `deepl-translation`
   - `modifyClass`
   - `chat-message`

**Copy any errors you see - they're critical for debugging!**

### Step 5: Test API Key Manually

In console, run this to test DeepL API directly:

```javascript
fetch('https://api-free.deepl.com/v2/translate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'text=Hello&target_lang=ES&auth_key=066ae965-3618-487e-93ca-a36365708c87:fx'
})
.then(r => r.json())
.then(d => console.log('DeepL Response:', d))
.catch(e => console.error('DeepL Error:', e));
```

**What you should see:**
- Success: `{translations: [{text: "Hola", ...}]}`
- Failure: Error message (API key invalid, quota exceeded, etc.)

---

## Common Issues & Solutions

### Issue 1: Theme Not Active
**Symptom:** `settings is not defined`
**Fix:** Make sure theme component is added to your active theme

### Issue 2: Chat Selector Changed
**Symptom:** Language selector doesn't appear
**Fix:** Discourse may use different chat selectors in your version

### Issue 3: API Key Not Set
**Symptom:** Console shows `deepl_api_key: ""`
**Fix:** Re-save settings with API key

### Issue 4: Chat API Changed
**Symptom:** Messages don't translate, no errors
**Fix:** Discourse chat API may have changed - theme component approach may not work on your version

### Issue 5: CORS/API Errors
**Symptom:** Network errors when calling DeepL
**Fix:** DeepL API should work from browser, but check network tab

---

## Quick Diagnostic Commands

Run ALL of these in browser console and tell me the results:

```javascript
// 1. Check if theme JavaScript loaded
console.log('Theme loaded:', typeof settings !== 'undefined');

// 2. Check settings
console.log('API Key:', settings?.deepl_api_key?.substring(0, 10) + '...');
console.log('Auto translate:', settings?.auto_translate_enabled);

// 3. Check chat elements
console.log('Chat drawer:', document.querySelector('.chat-drawer'));
console.log('Chat messages:', document.querySelectorAll('.chat-message').length);

// 4. Check if initializer ran
console.log('Has language selector:', document.getElementById('deepl-language-selector'));

// 5. Check localStorage
console.log('User language:', localStorage.getItem('deepl_user_language'));
```

---

## What to Report Back

Please tell me:

1. ✅ or ❌ Theme is attached to active theme
2. ✅ or ❌ `settings` object exists in console
3. ✅ or ❌ API key shows in settings
4. ✅ or ❌ `.chat-drawer` element exists
5. ✅ or ❌ Any JavaScript errors (copy them)
6. ✅ or ❌ DeepL API test works
7. Your Discourse version (Admin → Dashboard, top right)

With this info, I can tell you exactly what's wrong and if this approach will work on your Discourse version.

---

## Honest Assessment

Theme components modifying chat is **not officially supported** by Discourse. It works by:
- Intercepting chat component rendering (fragile)
- Client-side API calls (API key visible)
- DOM manipulation (breaks if Discourse updates)

**If debugging shows it won't work:**
- The full **plugin version** is more reliable (requires Business tier)
- OR we can try a different approach (chat webhook/bot)
- OR wait for official Discourse translation support

Let's debug first and see what's actually happening! 🔍
