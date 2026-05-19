import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDxz2YY_A2MpVH0aKbpbbdtbqrIA9sp5cI",
  authDomain: "powerpeer-10f3d.firebaseapp.com",
  projectId: "powerpeer-10f3d",
  storageBucket: "powerpeer-10f3d.firebasestorage.app",
  messagingSenderId: "345970862596",
  appId: "1:345970862596:web:a739718a6ae3d6c1ef2351",
  measurementId: "G-YJ0SLYMT61"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
