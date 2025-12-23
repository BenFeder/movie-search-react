import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAePjDKpSJdlKlyIB9wGgdMLfCtlnhZUbI",
  authDomain: "movie-search-react-46a31.firebaseapp.com",
  projectId: "movie-search-react-46a31",
  storageBucket: "movie-search-react-46a31.firebasestorage.app",
  messagingSenderId: "874712527014",
  appId: "1:874712527014:web:3dc5a72d11575c53e00467",
  measurementId: "G-5FB50CTLZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
