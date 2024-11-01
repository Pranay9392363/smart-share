
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFLo4IKCkWKI4k5yKNQ0WUxX0M5JvAX1E",
  authDomain: "lowda-8d0b0.firebaseapp.com",
  projectId: "lowda-8d0b0",
  storageBucket: "lowda-8d0b0.appspot.com",
  messagingSenderId: "442590292530",
  appId: "1:442590292530:web:cfc79d9f073033222faa2b",
  measurementId: "G-MBV7CZS31F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Storage
export default app;


