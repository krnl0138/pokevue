// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzMy26WkUsgY1EeAXJ6HD1ijf0AE92Z9I",
  authDomain: "pokemon-34dc9.firebaseapp.com",
  databaseURL:
    "https://pokemon-34dc9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-34dc9",
  storageBucket: "pokemon-34dc9.appspot.com",
  messagingSenderId: "496074883722",
  appId: "1:496074883722:web:e466005e98a02fe5cda373",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
