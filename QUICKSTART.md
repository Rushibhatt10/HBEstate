# HBE Real Estate Portal - Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Get Cloudinary Credentials (2 min)
1. Go to https://cloudinary.com/users/register
2. Sign up or login
3. Dashboard → copy your **Cloud Name**
4. Go to Settings → Upload → Upload presets
5. Click "Add upload preset"
6. Name: `hbe_properties`
7. Turn ON "Unsigned"
8. Save

### Step 3: Get Firebase Credentials (1 min)
1. Go to https://console.firebase.google.com/
2. Create new project (name: "hbestate")
3. Create Firestore Database in test mode
4. Project Settings → copy your config values

### Step 4: Update .env File (1 min)
Create `.env` in project root:

```env
# Firebase Config (from Project Settings)
VITE_FIREBASE_API_KEY=YOUR_VALUE
VITE_FIREBASE_AUTH_DOMAIN=YOUR_VALUE
VITE_FIREBASE_PROJECT_ID=YOUR_VALUE
VITE_FIREBASE_STORAGE_BUCKET=YOUR_VALUE
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_VALUE
VITE_FIREBASE_APP_ID=YOUR_VALUE

# Cloudinary Config
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=hbe_properties
```

### Step 5: Start Dev Server
```bash
npm run dev
```

Visit: http://localhost:5173

---

## Test the App

### 1. Home Page
✅ Should load with hero section

### 2. Properties Page
✅ Should show "No properties" (empty initially)

### 3. Admin Login
- Go to `/admin/login`
- Enter: `admin`
- ✅ Should redirect to dashboard

### 4. Add Property
- Click "Add Property"
- Fill in details
- Upload image
- Click "Add Property"
- ✅ Should appear on properties page

---

## Common Issues

**"Cloudinary configuration missing"**
- Check `.env` has both Cloudinary lines
- Restart server

**"Failed to load properties"**
- Go to Firebase → Firestore → Rules
- Replace with:
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

**"Admin login not working"**
- Open DevTools (F12)
- Application → Local Storage → Delete all
- Try again

---

## Next Steps

1. ✅ Get it running
2. ⬜ Add sample properties
3. ⬜ Customize branding
4. ⬜ Deploy to production
5. ⬜ Implement proper security

---

## File Locations

- 🔧 Environment variables: `.env`
- 🏠 Home page: `src/pages/Home.jsx`
- 🏢 Properties page: `src/pages/Properties.jsx`
- 🔑 Admin login: `src/pages/Admin/Login.jsx`
- ➕ Add property: `src/pages/Admin/AddProperty.jsx`
- 💾 Firebase setup: `src/firebase.js`
- 📤 Image upload: `src/utils/cloudinaryUtils.js`

---

## Important Notes

⚠️ **Development vs Production:**
- Current Firestore rules are for **development only**
- Before deploying, update security rules
- Change admin password in `src/pages/Admin/Login.jsx`

📱 **Testing:**
- Test on multiple devices
- Test with different image sizes
- Test form validation

🚀 **Deployment:**
- See SETUP_GUIDE.md for production deployment
- Set proper environment variables
- Update Firestore security rules

---

## Support

- 📧 Email: hbestatesolution@gmail.com
- 📞 Phone: +91 9825355650
- 📖 Docs: SETUP_GUIDE.md & TROUBLESHOOTING.md

Enjoy! 🎉
