// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQkI6S5L7BkxtZscmdgkRXrSC79uDegHU",
  authDomain: "cpre329project1.firebaseapp.com",
  projectId: "cpre329project1",
  storageBucket: "cpre329project1.firebasestorage.app",
  messagingSenderId: "301882557606",
  appId: "1:301882557606:web:6cc045a33ada644bd8e067",
  measurementId: "G-W6FN0YWFYV"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app