
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCSU6bSkU019rtJLM2L9k2ZT-goNrK-9Ws",
  authDomain: "krish-57c5b.firebaseapp.com",
  projectId: "krish-57c5b",
  storageBucket: "krish-57c5b.appspot.com",
  messagingSenderId: "632968883872",
  appId: "1:632968883872:web:31b04b54238d04317623c5"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth()

// Initializing Database
const db = getFirestore()

export {auth, db}