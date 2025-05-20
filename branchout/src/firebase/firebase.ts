// firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnootJBNjQqs5q42BEA1UvR5FF4gBCmkc",
  authDomain: "ecoroots-57b39.firebaseapp.com",
  projectId: "ecoroots-57b39",
  storageBucket: "ecoroots-57b39.firebasestorage.app",
  messagingSenderId: "422531342395",
  appId: "1:422531342395:web:3058b751634ee7344abc1e",
  measurementId: "G-L4412HXD5C",
};

// Initialize Firebase app once
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export services globally
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
