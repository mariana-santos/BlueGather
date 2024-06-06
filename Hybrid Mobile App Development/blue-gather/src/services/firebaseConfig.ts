import { initializeApp } from 'firebase/app';
import { getStorage, ref } from "firebase/storage";
export { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChx19AXD2fTUWIeA857uspxu-QgcNakr4",
  authDomain: "blue-gather.firebaseapp.com",
  projectId: "blue-gather",
  storageBucket: "blue-gather.appspot.com",
  messagingSenderId: "772734799189",
  appId: "1:772734799189:web:f6bd269b3335482be0f3dc"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp, "gs://blue-gather.appspot.com");
