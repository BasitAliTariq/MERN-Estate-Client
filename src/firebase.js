// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "maern-estate.firebaseapp.com",
  projectId: "maern-estate",
  storageBucket: "maern-estate.firebasestorage.app",
  messagingSenderId: "1068704537330",
  appId: "1:1068704537330:web:a2e97dd4f93fb87b0d0e6b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
