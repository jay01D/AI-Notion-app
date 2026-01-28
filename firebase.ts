import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYRIIMGJEmZywwO1Moi2tgGIvyxmRdVnE",
  authDomain: "ai-notion-app-6bfd4.firebaseapp.com",
  projectId: "ai-notion-app-6bfd4",
  storageBucket: "ai-notion-app-6bfd4.firebasestorage.app",
  messagingSenderId: "239632206038",
  appId: "1:239632206038:web:5f9a50323da2d69241a177",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
