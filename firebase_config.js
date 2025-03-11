// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";    
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzOPCO4OMD3OXuzS4O238sesFnO7f3Oiw",
  authDomain: "syncride-57cae.firebaseapp.com",
  projectId: "syncride-57cae",
  storageBucket: "syncride-57cae.firebasestorage.app",
  messagingSenderId: "121473455177",
  appId: "1:121473455177:web:b47688c47f696704ac5b98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
