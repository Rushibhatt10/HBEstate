# HBE Real Estate Portal - Setup Guide

## Overview
This guide will help you set up the HBE Real Estate Portal with all necessary configurations for Firebase and Cloudinary integration.

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudinary account (free tier available)
- Firebase project

---

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 19.2.0
- Firebase 12.8.0
- Vite (bundler)
- TailwindCSS for styling
- Framer Motion for animations
- Lucide React for icons

---

## Step 2: Firebase Configuration

### 2.1 Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the prompts
3. Once created, go to Project Settings (gear icon)
4. Under "General" tab, you'll find your Web App configuration

### 2.2 Update .env File

Replace the placeholder values in your `.env` file with actual Firebase credentials:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 2.3 Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (for development)
4. Choose a region (preferably closest to your users)

### 2.4 Update Firestore Security Rules

For **DEVELOPMENT** (NOT for production), use these rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Important**: Before deploying to production, update these rules to secure your database properly.

---

## Step 3: Cloudinary Configuration

### 3.1 Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/users/register)
2. Sign up for a free account
3. Go to your [Dashboard](https://cloudinary.com/console)
4. You'll see your **Cloud Name** at the top

### 3.2 Create Upload Preset

1. In Cloudinary Dashboard, go to **Settings** → **Upload** tab
2. Scroll to **Upload presets** section
3. Click "Add upload preset"
4. Set the following:
   - **Name**: `hbe_properties` (or any name you prefer)
   - **Unsigned**: Turn ON (for client-side uploads)
   - **Folder**: `hbe_properties` (optional but recommended)
5. Click "Save"

### 3.3 Update .env File

Add your Cloudinary credentials to `.env`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=hbe_properties
```

You can find your Cloud Name in the Cloudinary Dashboard.

---

## Step 4: Admin Password Setup

### Important Security Note
The current implementation uses a hardcoded admin password. For development, it's set to `"admin"`.

**To change it:**

Edit [src/pages/Admin/Login.jsx](src/pages/Admin/Login.jsx) and update:

```javascript
const ADMIN_PASSWORD = "your-secure-password-here";
```

**⚠️ For production, implement proper authentication!**

---

## Step 5: Running the Application

### Development Mode
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Step 6: Test the Application

### 1. Home Page
Visit `http://localhost:5173` - You should see the home page with hero section and navigation.

### 2. Properties Page
Navigate to `/properties` to view all properties. (Empty initially)

### 3. Admin Login
1. Go to `/admin/login`
2. Enter password: `admin` (or your custom password)
3. You should be redirected to `/admin/dashboard`

### 4. Add Property
1. From admin dashboard, click "Add Property"
2. Fill in all details
3. Upload an image (Cloudinary will handle the upload)
4. Click "Add Property"

---

## Troubleshooting

### Issue: "Cloudinary configuration missing"

**Solution:**
1. Check that `.env` file exists in the project root
2. Verify `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` are set
3. After changing `.env`, restart the development server

### Issue: "Failed to load properties"

**Solution:**
1. Go to Firebase Console → Firestore Database
2. Check if your database exists
3. Verify Firestore Security Rules allow reads
4. Check browser console (F12) for detailed error messages

### Issue: "Image upload fails"

**Solution:**
1. Verify Cloudinary upload preset is set to "Unsigned"
2. Check file size (max 5MB)
3. Ensure file is a valid image format (JPG, PNG, GIF, WebP)
4. Check browser console for specific error message

### Issue: Admin login not working

**Solution:**
1. Check localStorage - go to DevTools → Application → LocalStorage
2. Clear all data and refresh
3. Try logging in again

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API Key | `AIzaSyD...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `hbestate-abcd8.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `hbestate-abcd8` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `hbestate-abcd8.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123456789:web:abc...` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `my-cloud` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary Upload Preset | `hbe_properties` |

---

## File Structure

```
Hbe/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   │   ├── Admin/        # Admin panel pages
│   │   └── ...           # Public pages
│   ├── utils/            # Utility functions
│   │   ├── cloudinaryUtils.js    # Image upload functions
│   │   ├── firestoreUtils.js     # Database functions
│   │   └── ...
│   ├── App.jsx           # Main app component
│   ├── firebase.js       # Firebase configuration
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── .env                  # Environment variables (DO NOT commit)
├── .env.example          # Example env file (for reference)
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

---

## Important Security Notes

⚠️ **Before Production:**

1. **Firestore Rules**: Update from test mode to proper security rules
2. **Admin Password**: Implement proper authentication (Firebase Auth)
3. **Environment Variables**: Never commit `.env` file to version control
4. **CORS**: Configure Cloudinary and Firebase CORS settings
5. **SSL/HTTPS**: Always use HTTPS in production

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Check browser console (F12) for error messages
3. Review Firebase Console logs
4. Check Cloudinary Dashboard for upload issues

---

## Next Steps

1. ✅ Set up Firebase and Cloudinary
2. ✅ Add sample properties via Admin Panel
3. ✅ Customize styling and branding
4. ✅ Deploy to production
5. ✅ Implement proper authentication
6. ✅ Set up monitoring and analytics

Enjoy using HBE Real Estate Portal! 🏠
