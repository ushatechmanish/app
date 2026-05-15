# Google OAuth Setup and Local Dev User

This app supports two modes:

1. **Real Google OAuth login** using `REACT_APP_GOOGLE_CLIENT_ID`
2. **Local dev auto-login** for fast development without Google sign-in

---

## 1. Enable Google OAuth

1. Open Google Cloud Console: https://console.cloud.google.com
2. Select your project or create a new one
3. Go to **APIs & Services > Credentials**
4. Create an **OAuth 2.0 Client ID** for a **Web application**
5. Add the following as authorized JavaScript origins:
   - `http://localhost:3000`
6. Add the following as authorized redirect URIs:
   - `http://localhost:3000`
7. Copy the generated **Client ID**

### `.env.local` example

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_ENABLE_DEV_LOCAL=false
```

> Note: the file must be named `.env.local` exactly. A plain `env.local` file is not loaded by Create React App.
> 
> Keep `.env.local` in `.gitignore` and never commit it to source control.

---

## 2. Enable local dev user

If you want to bypass Google login while developing locally, set:

```env
REACT_APP_ENABLE_DEV_LOCAL=true
```

This will activate the built-in development user when:
- the app is running in `development` mode,
- and `REACT_APP_ENABLE_DEV_LOCAL=true`.

The app will automatically sign in as the test user defined in `src/App.tsx`.

---

## 3. How to switch modes

- To use real Google OAuth: set `REACT_APP_GOOGLE_CLIENT_ID` and `REACT_APP_ENABLE_DEV_LOCAL=false`
- To use local dev login: set `REACT_APP_ENABLE_DEV_LOCAL=true`

If both are present, local dev login will still work during development when enabled.

---

## 4. Restart after changing environment

After editing `.env.local`, stop the dev server and restart it:

```bash
npm start
```

Also clear old local auth state from the browser.

### Option A: Browser console
Open devtools, then paste and run:

```js
localStorage.removeItem('user')
localStorage.removeItem('authToken')
```

### Option B: Browser DevTools UI
1. Open devtools
2. Go to **Application** → **Local Storage** → `http://localhost:3000`
3. Delete `user` and `authToken`

### Option C: Hard refresh
If localStorage still persists, refresh the page after clearing storage.

```bash
npm start
```

---

## 5. Confirm working state

- If OAuth is enabled, the login page should show the Google sign-in button.
- If dev local is enabled, the app will auto-authenticate as the test developer user.