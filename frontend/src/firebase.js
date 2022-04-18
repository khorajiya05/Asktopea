// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYU5eQZFAm9qU6t1QkNq5QWWQ1pUghdAc",
  authDomain: "asktopea.firebaseapp.com",
  projectId: "asktopea",
  storageBucket: "asktopea.appspot.com",
  messagingSenderId: "69738747534",
  appId: "1:69738747534:web:4bc0563a17933de9789bdf",
  measurementId: "G-2HK375BVME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
