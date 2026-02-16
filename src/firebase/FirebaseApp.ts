// Import the functions you need from the SDKs you need
import {FirebaseOptions, initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import FirestoreConstants from "./firestore/FirestoreConstants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyBeWD2EyonYvWsLR8QhZ4XP3auN6sjFWuA",
    authDomain: "sentinel-25902.firebaseapp.com",
    projectId: "sentinel-25902",
    storageBucket: "sentinel-25902.firebasestorage.app",
    messagingSenderId: "357338564537",
    appId: "1:357338564537:web:8be122c5e6aacae3711868",
    measurementId: "G-48SRP2HXXL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp, FirestoreConstants.ID);
const analytics = getAnalytics(firebaseApp);