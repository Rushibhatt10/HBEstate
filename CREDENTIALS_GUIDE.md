# 🔑 Getting Your Credentials - Visual Guide

## Cloudinary Credentials

### Step 1: Sign Up
1. Go to https://cloudinary.com/users/register
2. Sign up with email or Google
3. Verify email

### Step 2: Find Cloud Name
1. Go to https://cloudinary.com/console
2. Look at the top of the page
3. You'll see: **Cloud name:** `your-cloud-name`
4. Copy this value

**In your `.env` file, set:**
```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### Step 3: Create Upload Preset
1. In Dashboard, click **Settings** (gear icon)
2. Click **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Fill in:
   - **Name:** `hbe_properties`
   - **Unsigned:** Turn ON (toggle switch)
6. Click **Save**

**In your `.env` file, set:**
```env
VITE_CLOUDINARY_UPLOAD_PRESET=hbe_properties
```

---

## Firebase Credentials

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click **Create new project** or **+ Add project**
3. Enter project name: `hbestate` (or any name)
4. Accept terms and click **Create project**
5. Wait for completion (about 1-2 minutes)

### Step 2: Get Configuration
1. After project is created, you'll see the project overview
2. Click ⚙️ (Settings icon) → **Project settings**
3. Under **Your apps** section, look for **Web app** (if not there, click **Add app**)
4. You'll see your Firebase config with these values:

```javascript
const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Copy each value to your `.env`:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### Step 3: Create Firestore Database
1. In Firebase Console, click **Firestore Database**
2. Click **Create database**
3. Choose **Test mode** (for development)
4. Click **Next**
5. Select region (any region works, closer is faster)
6. Click **Enable**
7. Wait 1-2 minutes

### Step 4: Set Up Security Rules
1. Click **Rules** tab in Firestore Database
2. Replace all content with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**
4. Done!

---

## Complete .env File Template

Here's what your complete `.env` file should look like:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=hbestate-abc123.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hbestate-abc123
VITE_FIREBASE_STORAGE_BUCKET=hbestate-abc123.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=my-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=hbe_properties
```

---

## Verification Checklist

### Cloudinary
- [ ] Cloud name copied to `.env`
- [ ] Upload preset created: `hbe_properties`
- [ ] Upload preset has "Unsigned" turned ON
- [ ] `.env` file saved

### Firebase
- [ ] Project created
- [ ] All 6 config values copied to `.env`
- [ ] Firestore Database created
- [ ] Security rules published
- [ ] `.env` file saved

### Local Setup
- [ ] `.env` file is in project root
- [ ] File name is exactly `.env` (not `.env.txt`)
- [ ] All values filled in (no placeholder text remaining)
- [ ] Development server restarted (`npm run dev`)

---

## Troubleshooting

### Can't Find Cloud Name
- Cloud name is at the top of Cloudinary dashboard
- Look for "Cloud name:" label
- It's a unique identifier like `my-cloud-abc123`

### Can't Find Firebase Config
1. Go to Firebase Console
2. Select your project
3. Click ⚙️ Settings
4. Scroll down to "Your apps"
5. Look for "Web" app
6. Config values are there

### Upload Preset Not Found
1. Go to Cloudinary Dashboard
2. Settings → Upload tab
3. Scroll to "Upload presets"
4. Should see your preset there
5. If not, create it again

### Still Having Issues?
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed help
- Contact: hbestatesolution@gmail.com

---

## Security Reminder

⚠️ **Important:**
- Never share your `.env` file
- Never commit `.env` to GitHub
- Add `.env` to `.gitignore`
- These credentials give access to your data
- Keep them private!

---

## Next Steps

1. ✅ Get Cloudinary Cloud Name
2. ✅ Create Cloudinary Upload Preset
3. ✅ Get Firebase Config
4. ✅ Create Firestore Database
5. ✅ Create `.env` file with all values
6. ✅ Restart dev server
7. ✅ Test the app

---

🎉 Once done, your app is ready to use!

See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for full setup instructions.
