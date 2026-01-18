
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB47mi7DCqttCrh81ggAZS0hvM7DNOHkcc",
  authDomain: "okinawun.firebaseapp.com",
  projectId: "okinawun",
  storageBucket: "okinawun.firebasestorage.app",
  messagingSenderId: "513925905444",
  appId: "1:513925905444:web:0aa5b85fd3e25b66136cb1",
  measurementId: "G-8YSGBTM7RD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
