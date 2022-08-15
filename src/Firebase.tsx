// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRIyDcpmfCufVNhkKotIxqwovC0fYu1Fs",
  authDomain: "to-do-list-42c23.firebaseapp.com",
  projectId: "to-do-list-42c23",
  storageBucket: "to-do-list-42c23.appspot.com",
  messagingSenderId: "697562979272",
  appId: "1:697562979272:web:cab1b66bb8c3d999b67efd"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export {db};