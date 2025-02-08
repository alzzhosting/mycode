import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBq31VBs_WBGQA88Q_URZ1THQqPI-t4-ek",
  authDomain: "chatapps-fa68f.firebaseapp.com",
  databaseURL: "https://chatapps-fa68f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatapps-fa68f",
  storageBucket: "chatapps-fa68f.firebasestorage.app",
  messagingSenderId: "432556455261",
  appId: "1:432556455261:web:6614a5e8c5303dd17724b4",
  measurementId: "G-LSJKHEDF66",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

