
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, updateDoc, collection, getDocs } from "firebase/firestore";

// 請在這裡填入你在 Firebase Console 獲取的 Config
// 為了演示，我們假設這些值可以透過環境變量獲取
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

// 數據同步 Hook 的邏輯基礎
export const syncData = (collectionName: string, docId: string, callback: (data: any) => void) => {
  return onSnapshot(doc(db, collectionName, docId), (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      callback(null);
    }
  });
};

export const saveData = async (collectionName: string, docId: string, data: any) => {
  await setDoc(doc(db, collectionName, docId), data);
};
