// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWzGSnUcRhD4KSQLv12lBgH6VhIdsZKwI",
  authDomain: "jovenbeneficio.firebaseapp.com",
  projectId: "jovenbeneficio",
  storageBucket: "jovenbeneficio.firebasestorage.app",
  messagingSenderId: "150020163157",
  appId: "1:150020163157:web:0dc012365a8960c21376dc",
  measurementId: "G-0HT7BG4V1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && !auth.emulatorConfig) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { app, auth };