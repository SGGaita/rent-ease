// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCKaxmd1AG6nRR9eyQAU3_IxF5z1UXIF_U",
    authDomain: "rentease-115a6.firebaseapp.com",
    databaseURL: "https://rentease-115a6-default-rtdb.firebaseio.com",
    projectId: "rentease-115a6",
    storageBucket: "rentease-115a6.appspot.com",
    messagingSenderId: "641452250702",
    appId: "1:641452250702:web:c4eda5916ac77279a0151f",
    measurementId: "G-ZE801MZBCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);