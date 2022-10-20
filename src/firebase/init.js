import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC2HVEv1loE7mldYacplahA_Qr51aBPTkU",
  authDomain: "oshaberi-fc569.firebaseapp.com",
  projectId: "oshaberi-fc569",
  storageBucket: "oshaberi-fc569.appspot.com",
  messagingSenderId: "931104385704",
  appId: "1:931104385704:web:eda57913d6dd64f889309d",
  databaseURL:
    "https://oshaberi-fc569-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
