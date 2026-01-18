
import firebase from "firebase/app";
import "firebase/firestore";

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

// 使用 Firebase v8 語法初始化應用，修復 initializeApp 導出錯誤
const app = firebase.initializeApp(firebaseConfig);
// 使用 Firebase v8 語法獲取 Firestore 實例，修復 getFirestore 導出錯誤
export const db = app.firestore();

// 數據同步 Hook 的邏輯基礎
export const syncData = (collectionName: string, docId: string, callback: (data: any) => void) => {
  // 使用 v8 鏈式調用修復 collection, doc, onSnapshot 導出錯誤
  return db.collection(collectionName).doc(docId).onSnapshot((doc) => {
    if (doc.exists) {
      callback(doc.data());
    } else {
      callback(null);
    }
  });
};

export const saveData = async (collectionName: string, docId: string, data: any) => {
  // 使用 v8 語法修復 setDoc 導出錯誤
  await db.collection(collectionName).doc(docId).set(data);
};
