// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1SlZPTdfFxO9IpEeaWfgLc8vR5-1ZPug",
  authDomain: "venia-consmetic.firebaseapp.com",
  projectId: "venia-consmetic",
  storageBucket: "venia-consmetic.appspot.com",
  messagingSenderId: "441661175863",
  appId: "1:441661175863:web:ee68175c9bd6eac920a7b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;