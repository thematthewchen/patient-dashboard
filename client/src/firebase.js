// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnZk71in-_G1E99zLjQjaqWFr53J1p2ic",
  authDomain: "finni-patient-dashboard-dff8c.firebaseapp.com",
  projectId: "finni-patient-dashboard-dff8c",
  storageBucket: "finni-patient-dashboard-dff8c.appspot.com",
  messagingSenderId: "57687729836",
  appId: "1:57687729836:web:ded2351bdd7ec13341e109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;