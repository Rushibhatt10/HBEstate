# 🏠 HBE Real Estate Portal

A modern, full-featured real estate management platform built with React, Firebase, and Cloudinary. Manage properties, handle customer queries, and showcase your real estate business online.

## ✨ Features

### Public Portal
- **Browse Properties** - View all listings with filters (price, type, BHK)
- **Search & Filter** - Find properties by location, price range, type
- **Property Details** - Comprehensive information with images and maps
- **Contact Form** - Easy inquiry system for potential clients
- **Responsive Design** - Works on desktop, tablet, and mobile

### Admin Panel
- **Secure Login** - Password-protected admin access
- **Add Properties** - Upload properties with images to Cloudinary
- **Edit Properties** - Modify existing listings
- **Delete Properties** - Remove listings from database
- **Query Management** - View and manage customer inquiries

### Technical Features
- ✅ Firebase Firestore for real-time database
- ✅ Cloudinary integration for image hosting
- ✅ Responsive TailwindCSS design
- ✅ Framer Motion animations
- ✅ Real-time updates
- ✅ Error handling & validation
- ✅ Optimized performance

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Cloudinary account (free)
- Firebase project

### Installation

1. **Clone & Install**
   ```bash
   cd HBE
   npm install
   ```

2. **Setup Environment Variables** (see [QUICKSTART.md](QUICKSTART.md))
   ```bash
   # Create .env file with your credentials
   cp .env.example .env
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Visit: `http://localhost:5173`
   - Admin login: `/admin/login`
   - Default password: `admin`

---

## 📚 Documentation

### Getting Started
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed configuration

### Support & Troubleshooting
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues & solutions

---

## 🏗️ Project Structure

```
HBE/
├── src/
│   ├── components/              # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── FirebaseExample.jsx
│   ├── pages/                   # Page components
│   │   ├── Home.jsx
│   │   ├── Properties.jsx
│   │   ├── PropertyDetails.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   ├── Hero.jsx
│   │   └── Admin/               # Admin panel pages
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── AddProperty.jsx
│   │       └── Queries.jsx
│   ├── utils/                   # Utility functions
│   │   ├── firebase.js          # Firebase config
│   │   ├── firestoreUtils.js    # Database operations
│   │   ├── cloudinaryUtils.js   # Image upload
│   │   ├── authUtils.js         # Authentication
│   │   └── priceUtils.js        # Price formatting
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static files
├── .env                         # Environment variables (not in repo)
├── .env.example                 # Example environment file
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── QUICKSTART.md               # Quick start guide
├── SETUP_GUIDE.md              # Detailed setup
└── TROUBLESHOOTING.md          # Troubleshooting guide
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=hbe_properties
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

---

## 📦 Dependencies

### Core
- **react** 19.2.0 - UI library
- **react-router-dom** 7.13.0 - Routing
- **firebase** 12.8.0 - Backend & database

### Styling & Animation
- **tailwindcss** 4.1.18 - Utility-first CSS
- **framer-motion** 12.29.0 - Animations
- **lucide-react** 0.563.0 - Icons

### Build Tools
- **vite** - Fast build tool
- **@vitejs/plugin-react** - React support

---

## 🚦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🔒 Security

### Development vs Production

**⚠️ Current Setup is for Development Only**

Before deploying to production:
1. Update Firestore Security Rules
2. Implement proper authentication
3. Set secure admin password
4. Enable HTTPS
5. Add environment-specific configurations

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for production security recommendations.

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Cloudinary configuration missing" | Check `.env` file and restart server |
| "Failed to load properties" | Update Firestore security rules |
| "Admin login not working" | Clear localStorage and try again |
| "Image upload fails" | Check file size (<5MB) and format |

For more issues, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## 🌐 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Other Platforms
- Vercel: `vercel deploy`
- Netlify: Connect GitHub repo
- AWS Amplify: `amplify publish`

---

## 📞 Support & Contact

**HBE Real Estate Solutions**
- 📧 Email: hbestatesolution@gmail.com
- 📞 Phone: +91 9825355650
- 🕒 Hours: Mon-Sat 10:30 AM - 6:00 PM
- 📍 Office: 11, New York Trade Center, SG Highway, Thaltej, Ahmedabad

---

## 📄 License

This project is proprietary software for HBE Real Estate Solutions.

---

## 🎯 Roadmap

- [ ] Advanced search filters
- [ ] User accounts & saved favorites
- [ ] Property comparison tool
- [ ] Virtual tours (3D)
- [ ] Payment integration
- [ ] Mobile app
- [ ] AI-powered recommendations

---

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- ✅ Property management system
- ✅ Admin panel
- ✅ Contact form
- ✅ Responsive design
- ✅ Error handling & validation
- ✅ Comprehensive documentation

---

## 👨‍💻 Development

### Getting Help
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Check browser console (F12)
3. Check Firebase Console logs
4. Contact support

### Running Locally
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

---

## 🙏 Acknowledgments

Built with:
- React & Vite
- Firebase & Firestore
- Cloudinary
- TailwindCSS
- Framer Motion

---

**Last Updated:** January 2026

---

🏠 **Ready to get started?** See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide!
