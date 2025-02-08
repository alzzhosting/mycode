import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDPIwc2K7hzmmawpr2KdCvQH0dOghjrkD8",
    authDomain: "mycode-8f120.firebaseapp.com",
    projectId: "mycode-8f120",
    storageBucket: "mycode-8f120.firebasestorage.app",
    messagingSenderId: "59759682993",
    appId: "1:59759682993:web:da4f8569f040c9a1dc8990",
    measurementId: "G-F35PMEBBEG"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

