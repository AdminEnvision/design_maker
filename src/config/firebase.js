import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBpAQ6KpcMtGzNFGJ8CTc0cfkwqtrfwZX8",
  authDomain: "fabrics-6b76c.firebaseapp.com",
  databaseURL: "https://fabrics-6b76c-default-rtdb.firebaseio.com",
  projectId: "fabrics-6b76c",
  storageBucket: "fabrics-6b76c.appspot.com",
  messagingSenderId: "199905516738",
  appId: "1:199905516738:web:a7715c73c956d7eb24ef5b",
};

export const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const firestore = getFirestore(app);
