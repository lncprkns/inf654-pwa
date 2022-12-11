import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged }  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyBHdp5gc7N2UjRWomXpkSqi2k3gW6-2H0I",
    authDomain: "around-your-house.firebaseapp.com",
    projectId: "around-your-house",
    storageBucket: "around-your-house.appspot.com",
    messagingSenderId: "806779689347",
    appId: "1:806779689347:web:7d1515124c5f0edfe97eb6"
    };
    
    const app = initializeApp(firebaseConfig);