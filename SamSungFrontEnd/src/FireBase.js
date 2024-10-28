// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXDQZg4GfKvc3RpwXBxA-A-TfQqfdUaU8",
  authDomain: "quannla.firebaseapp.com",
  projectId: "quannla",
  storageBucket: "quannla.appspot.com",
  messagingSenderId: "685783384385",
  appId: "1:685783384385:web:dc6bcc0e51a880bff0e1c0",
  measurementId: "G-NMKH5SDRTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)