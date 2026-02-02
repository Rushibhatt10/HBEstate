// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAK9wLnLHJmiJluLzSeVOuOmu3yPsJ4bB0",
    authDomain: "hbestate-abcd8.firebaseapp.com",
    projectId: "hbestate-abcd8",
    storageBucket: "hbestate-abcd8.firebasestorage.app",
    messagingSenderId: "163745634332",
    appId: "1:163745634332:web:74bcba10b960871f7027d9",
    measurementId: "G-85KTSZK1QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
export default app;