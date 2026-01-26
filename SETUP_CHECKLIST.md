# 📋 Setup Checklist - HBE Real Estate Portal

## Pre-Setup (5 minutes)
- [ ] Node.js installed (verify: `node -v`)
- [ ] npm installed (verify: `npm -v`)
- [ ] Project folder downloaded/cloned
- [ ] Opened project in VS Code or editor

---

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

**Verify:**
- [ ] No red error messages
- [ ] `node_modules` folder created
- [ ] Command completed successfully

---

## Step 2: Get Cloudinary Credentials (2 minutes)

### 2a: Create Cloudinary Account
- [ ] Go to https://cloudinary.com/users/register
- [ ] Sign up or login
- [ ] Go to [Dashboard](https://cloudinary.com/console)

### 2b: Copy Cloud Name
- [ ] Your Cloud Name visible at top of dashboard
- [ ] Copy it somewhere (you'll need it soon)

### 2c: Create Upload Preset
- [ ] Click Settings (gear icon)
- [ ] Go to Upload tab
- [ ] Find "Upload presets" section
- [ ] Click "Add upload preset"
- [ ] Set **Name**: `hbe_properties`
- [ ] Set **Unsigned**: ON (toggle it)
- [ ] Click Save

---

## Step 3: Get Firebase Credentials (2 minutes)

### 3a: Create Firebase Project
- [ ] Go to https://console.firebase.google.com/
- [ ] Click "Create new project" or "+ Add project"
- [ ] Project name: `hbestate` (or anything)
- [ ] Click Create

### 3b: Get Configuration Values
- [ ] Go to Project Settings (⚙️ icon)
- [ ] Copy all these values:
  - [ ] API Key
  - [ ] Auth Domain
  - [ ] Project ID
  - [ ] Storage Bucket
  - [ ] Messaging Sender ID
  - [ ] App ID

### 3c: Create Firestore Database
- [ ] Click "Firestore Database"
- [ ] Click "Create database"
- [ ] Select "Test mode" (for development)
- [ ] Click Next
- [ ] Select a region (closest to you is fine)
- [ ] Click Enable
- [ ] Wait 1-2 minutes for initialization

---

## Step 4: Update .env File (3 minutes)

### 4a: Create .env File
- [ ] In project root, create file named `.env`
- [ ] Copy this template:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=hbe_properties
```

### 4b: Fill in Values
- [ ] Replace `YOUR_API_KEY` with your Firebase API Key
- [ ] Replace `YOUR_AUTH_DOMAIN` with your Firebase Auth Domain
- [ ] Replace `YOUR_PROJECT_ID` with your Firebase Project ID
- [ ] Replace `YOUR_STORAGE_BUCKET` with your Firebase Storage Bucket
- [ ] Replace `YOUR_SENDER_ID` with your Firebase Messaging Sender ID
- [ ] Replace `YOUR_APP_ID` with your Firebase App ID
- [ ] Replace `your_cloud_name` with your Cloudinary Cloud Name
- [ ] Keep `hbe_properties` as is (matches upload preset)

### 4c: Save File
- [ ] Save `.env` file
- [ ] Do NOT commit or share this file!
- [ ] It contains sensitive credentials

---

## Step 5: Configure Firestore Security Rules (2 minutes)

### 5a: Open Security Rules
- [ ] Go to Firebase Console
- [ ] Click Firestore Database
- [ ] Click Rules tab

### 5b: Update Rules
- [ ] Clear existing content
- [ ] Paste this:

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

### 5c: Publish
- [ ] Click "Publish"
- [ ] Wait for confirmation

**⚠️ Note:** These are development rules only. Update before production!

---

## Step 6: Start Development Server (1 minute)

### 6a: Start Server
```bash
npm run dev
```

- [ ] No error messages in terminal
- [ ] Terminal shows: `Local: http://localhost:5173`

### 6b: Open in Browser
- [ ] Open http://localhost:5173
- [ ] Home page should load
- [ ] No errors in browser console (F12)

---

## Step 7: Test Admin Login (1 minute)

### 7a: Navigate to Admin
- [ ] Go to http://localhost:5173/admin/login
- [ ] Page should load

### 7b: Login
- [ ] Enter password: `admin`
- [ ] Click "Access Admin Panel"
- [ ] Should redirect to `/admin/dashboard`
- [ ] Dashboard should be empty

---

## Step 8: Test Add Property (3 minutes)

### 8a: Create Property
- [ ] Click "Add Property" button
- [ ] Fill in details:
  - [ ] Title: "Test Property"
  - [ ] Price: "₹50 Lakh"
  - [ ] Location: "Test Location"
  - [ ] Type: Any option
  - [ ] Status: Any option
  - [ ] Description: "Test description"

### 8b: Upload Image
- [ ] Click upload area
- [ ] Select an image from your computer
- [ ] Wait for upload to complete
- [ ] Image should appear

### 8c: Submit
- [ ] Click "Add Property"
- [ ] Should show success message
- [ ] Should redirect to dashboard
- [ ] New property should appear in list

---

## Step 9: Verify Everything Works (2 minutes)

### 9a: Check Public Page
- [ ] Go to http://localhost:5173/properties
- [ ] Your test property should appear
- [ ] Can search and filter
- [ ] Click property to view details

### 9b: Check Contact Form
- [ ] Go to http://localhost:5173/contact
- [ ] Try submitting form with test data
- [ ] Should succeed (message should say "sent")

### 9c: Check Browser Console
- [ ] Press F12 to open DevTools
- [ ] Go to Console tab
- [ ] Should have no red error messages
- [ ] Only warnings are acceptable

---

## Troubleshooting Checks

### If .env Not Working
- [ ] Verify file is named exactly `.env` (not `.env.txt`)
- [ ] Verify file is in project root (same folder as `package.json`)
- [ ] Restart development server (Ctrl+C, then `npm run dev`)

### If Login Not Working
- [ ] Press F12 → Application tab
- [ ] Clear all LocalStorage
- [ ] Refresh page
- [ ] Try login again

### If Image Upload Fails
- [ ] Check file size (must be less than 5MB)
- [ ] Check file type (JPG, PNG, GIF, or WebP only)
- [ ] Check internet connection speed
- [ ] Try a different image

### If Properties Don't Load
- [ ] Check Firestore Database in Firebase Console
- [ ] Verify database exists and is initialized
- [ ] Check Firestore Rules (should allow reads)
- [ ] Open browser console (F12) for error details

---

## Final Verification

- [ ] Homepage loads ✓
- [ ] Properties page works ✓
- [ ] Admin login works ✓
- [ ] Can add property ✓
- [ ] Image uploads work ✓
- [ ] New property appears on site ✓
- [ ] Contact form works ✓
- [ ] No error messages ✓

---

## ✅ You're All Set!

If all checkboxes above are checked, your HBE Real Estate Portal is:
- ✅ Fully configured
- ✅ Working properly
- ✅ Ready to use
- ✅ Error-free

### Next Steps

1. **Add More Properties** - Use admin panel to add listings
2. **Customize** - Update colors, text, contact info in code
3. **Deploy** - Deploy to production when ready
4. **Get Help** - See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) if issues arise

---

## 📞 Need Help?

- 📧 Email: hbestatesolution@gmail.com
- 📞 Phone: +91 9825355650
- 📖 Guide: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- ⚡ Quick: [QUICKSTART.md](QUICKSTART.md)

---

## 📚 Documentation

- **QUICKSTART.md** - 5-minute setup overview
- **SETUP_GUIDE.md** - Detailed configuration guide
- **TROUBLESHOOTING.md** - Problem-solving reference
- **FIX_SUMMARY.md** - List of all fixes applied
- **README.md** - Project overview

---

**Estimated Total Time:** 20-30 minutes

🎉 **Congratulations! Your site is now live!**
