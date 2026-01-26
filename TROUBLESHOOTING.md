# HBE Real Estate Portal - Troubleshooting Guide

## Quick Reference

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Cloudinary configuration missing" | `.env` file missing credentials | See [Cloudinary Configuration](#cloudinary-configuration-issues) |
| "Failed to load properties" | Firestore permissions issue | See [Firebase Firestore Issues](#firebase-firestore-issues) |
| "Admin login not working" | localStorage cleared or wrong password | See [Authentication Issues](#authentication-issues) |
| "Image upload fails" | File size/type or Cloudinary issue | See [Image Upload Issues](#image-upload-issues) |

---

## Detailed Troubleshooting

### Cloudinary Configuration Issues

#### Error: "Cloudinary configuration missing. Please check .env file."

**Cause**: Environment variables not set correctly

**Fix**:
1. Open `.env` file in the project root
2. Ensure these lines exist:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=hbe_properties
   ```
3. Get your Cloud Name from [Cloudinary Dashboard](https://cloudinary.com/console)
4. Create an upload preset:
   - Settings → Upload → Upload presets → Add upload preset
   - Set "Unsigned" to ON
5. **Restart the development server** (Ctrl+C then `npm run dev`)

#### Error: "Upload preset not found"

**Cause**: Upload preset doesn't exist or is misspelled

**Fix**:
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Settings → Upload → Upload presets
3. Verify your preset name matches `VITE_CLOUDINARY_UPLOAD_PRESET` in `.env`
4. Ensure "Unsigned" is turned ON
5. Update `.env` if needed and restart server

#### Error: "Invalid cloud name"

**Cause**: Cloud name is incorrect or not set

**Fix**:
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Your Cloud Name appears at the top of the page
3. Update `.env`:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   ```
4. Restart development server

---

### Firebase Firestore Issues

#### Error: "Missing or insufficient permissions"

**Cause**: Firestore security rules don't allow read access

**Fix - For Development**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Firestore Database → Rules
4. Replace all content with:
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
5. Click "Publish"
6. Refresh your browser

**⚠️ Important**: This is for **development only**. Before production, implement proper security rules.

#### Error: "Failed to connect to Firestore"

**Cause**: Firebase credentials not set or internet connection issue

**Fix**:
1. Check `.env` file has Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your-key
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_AUTH_DOMAIN=your-domain
   VITE_FIREBASE_STORAGE_BUCKET=your-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```
2. Check internet connection
3. Verify Firebase project exists in [Firebase Console](https://console.firebase.google.com/)
4. Restart development server

#### Error: "Firestore Database not found"

**Cause**: Firestore database not initialized

**Fix**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Firestore Database → Create Database
4. Choose Start mode: **Test mode** (for development)
5. Select a region (preferably closest to your location)
6. Click Create
7. Wait 1-2 minutes for initialization
8. Refresh your app

---

### Authentication Issues

#### Error: "Admin login not working"

**Cause**: Multiple possible reasons

**Fix**:
1. Clear browser cache and localStorage:
   - Press F12 to open DevTools
   - Go to Application tab
   - Click Storage → Local Storage
   - Delete all entries
   - Refresh page

2. Check admin password:
   - Go to [Login.jsx](src/pages/Admin/Login.jsx)
   - Default password is `admin`
   - Try logging in with this

3. Check if localStorage is enabled:
   - DevTools → Console
   - Type: `localStorage.setItem('test', '1')`
   - Type: `localStorage.getItem('test')`
   - Should return `'1'`

#### Error: "Admin panel not accessible"

**Cause**: Not logged in or session expired

**Fix**:
1. Go to `/admin/login`
2. Enter password: `admin` (or your custom password)
3. If error shows, clear cache (see above)
4. Try again

---

### Image Upload Issues

#### Error: "File size exceeds 5MB limit"

**Cause**: Uploaded file is too large

**Fix**:
- Compress image before uploading
- Tools: [TinyPNG](https://tinypng.com/), [Compressor.io](https://compressor.io/)
- Maximum size: 5MB
- Recommended: Under 2MB for better performance

#### Error: "Invalid file type"

**Cause**: Uploaded file is not an image

**Fix**:
- Only JPG, PNG, GIF, WebP formats supported
- Convert file if needed using:
  - Online: [CloudConvert](https://cloudconvert.com/)
  - Tools: Photoshop, GIMP, IrfanView

#### Error: "Image upload stuck on loading"

**Cause**: Slow internet or Cloudinary service issue

**Fix**:
1. Wait 30 seconds (Cloudinary may be processing)
2. Check internet speed: [speedtest.net](https://speedtest.net/)
3. Try a smaller image file
4. Try uploading in an incognito window
5. Check Cloudinary status: [status.cloudinary.com](https://status.cloudinary.com/)

#### Error: "Uploaded image URL not working"

**Cause**: Cloudinary transformation or settings issue

**Fix**:
1. Try uploading again
2. Check Cloudinary Media Library: [Cloudinary Console](https://cloudinary.com/console/media_library)
3. Verify upload preset is "Unsigned"
4. Check folder permissions in upload preset settings

---

### General Performance Issues

#### Problem: "Page loading slowly"

**Cause**: Large images or poor internet

**Fix**:
1. Check internet speed
2. Upload smaller images (recommended: under 2MB)
3. Browser DevTools → Network tab
   - Check which files are loading slowly
   - See if Cloudinary is the bottleneck

#### Problem: "Properties not showing after adding"

**Cause**: Data hasn't synced or caching issue

**Fix**:
1. Wait 5-10 seconds
2. Refresh page (F5)
3. Clear browser cache:
   - DevTools → Application → Clear storage
   - Refresh
4. Check Firestore console to verify data was saved

---

### Development Mode Issues

#### Error: "Module not found" or "Cannot find package"

**Cause**: Dependencies not installed

**Fix**:
```bash
# Install all dependencies
npm install

# Clear npm cache if needed
npm cache clean --force
npm install
```

#### Error: "Port 5173 already in use"

**Cause**: Another app using the same port

**Fix**:
```bash
# Option 1: Use different port
npm run dev -- --port 3000

# Option 2: Kill process using port 5173
# Windows PowerShell:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

#### Error: ".env file not found"

**Cause**: `.env` file doesn't exist

**Fix**:
1. Create `.env` file in project root
2. Copy content from `.env.example`
3. Fill in your actual credentials
4. Save and restart server

---

### Browser Console Errors

#### How to Check Browser Console

1. Press `F12` to open Developer Tools
2. Click "Console" tab
3. Look for red error messages
4. Copy full error message and search in this guide

#### Common Console Errors

**"React DevTools not found"**
- This is just a warning, not critical
- Can be ignored

**"Failed to fetch"**
- Usually a CORS or connection issue
- Check internet connection
- Check Firestore is accessible

**"Uncaught TypeError: Cannot read property..."**
- Usually means a function or object is undefined
- Check `.env` file is properly set
- Restart server

---

### Quick Fixes Checklist

- [ ] Restart development server (`npm run dev`)
- [ ] Clear browser cache (DevTools → Clear storage)
- [ ] Verify `.env` file exists and has all variables
- [ ] Check internet connection
- [ ] Verify Firebase project exists and is active
- [ ] Verify Firestore database exists
- [ ] Verify Cloudinary account and upload preset
- [ ] Check Firestore security rules allow reads
- [ ] Try in incognito/private browser window

---

### When to Clear Cache

Clear your browser cache when:
- Making changes to `.env` file
- Changing Firestore rules
- After deploying new code
- If page shows stale data
- If upload keeps failing

**Clear cache:**
1. DevTools (F12) → Application
2. Storage → Local Storage → Select site → Delete All
3. Session Storage → Select site → Delete All
4. Refresh page (Ctrl+F5 for hard refresh)

---

### Getting Help

If you still have issues:

1. **Check the logs:**
   - Browser Console (F12)
   - Firebase Console logs
   - Terminal output

2. **Search for the error:**
   - Copy exact error message
   - Google it
   - Check Stack Overflow

3. **Check official docs:**
   - [Firebase Docs](https://firebase.google.com/docs)
   - [Cloudinary Docs](https://cloudinary.com/documentation)
   - [React Docs](https://react.dev)

4. **Contact Support:**
   - Email: hbestatesolution@gmail.com
   - Phone: +91 9825355650

---

## Debugging Tips

### Using Browser DevTools

**Console Tab:**
- Check for errors (red messages)
- Check for warnings (yellow messages)
- Type commands: `localStorage.getItem('isAdminLoggedIn')`

**Network Tab:**
- See all requests and responses
- Check status codes (200 = OK, 400+ = Error)
- See how long requests take

**Storage Tab:**
- View localStorage data
- View cookies
- View session storage

**Elements Tab:**
- Inspect page structure
- Check if elements exist
- Check CSS styling

---

## Advanced Debugging

### Check Firebase Connection

In browser console:
```javascript
// Should return your project ID
import { db } from './src/firebase.js'
console.log(db._key.projectId)
```

### Check Cloudinary Setup

In browser console:
```javascript
console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
```

### Test Firestore Read

In browser console:
```javascript
import { getDocuments } from './src/utils/firestoreUtils.js'
getDocuments('properties').then(data => console.log(data))
```

---

Last Updated: January 2026
