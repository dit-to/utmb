import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDkTlvwtcVGgc-adgjeuKPnMIZSPObmZmM",
  authDomain: "utmb-f2af5.firebaseapp.com",
  projectId: "utmb-f2af5",
  storageBucket: "utmb-f2af5.appspot.com",
  messagingSenderId: "296748737602",
  appId: "1:296748737602:web:77c9f9298cb7a97e8af9db",
  measurementId: "G-BE9HDDPDQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
