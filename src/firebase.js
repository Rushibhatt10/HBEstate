// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key-here",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain-here",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hbestate-abcd8",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-storage-bucket-here",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id-here",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id-here",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "your-measurement-id-here"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
export default app;