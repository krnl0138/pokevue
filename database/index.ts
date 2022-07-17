// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { get, getDatabase, onValue, ref, remove, set } from "firebase/database";
import { User } from "../utils/types";
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
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

//
// db
const userRef = (userId: string) => ref(db, `users/${userId}`);
const favouritesRef = (userId: string) => ref(db, `users/${userId}`);

export const writeUserData = (userId: string, data: User) => {
  set(userRef(userId), data);
};
export const writeFavourite = async (userId: string, favourite: number) => {
  const favouriteRef = ref(db, `users/${userId}/favourites/${favourite}`);
  set(favouriteRef, favourite);
};

export const removeFavourite = (userId: string, favourite: number) => {
  const favouriteRef = ref(db, `users/${userId}/favourites/${favourite}`);
  remove(favouriteRef);
};

export const readUserData = (userId: string) => {
  if (userId === undefined && auth.currentUser) {
    userId = auth.currentUser.uid;
  }
  onValue(userRef(userId), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
};

export const getUser = async (userId: string) => {
  console.log("userId passed in getUser: ", userId);
  const userSnapshot = await get(userRef(userId));
  return userSnapshot.val();
};

export const getUserFavourites = async () => {
  const userId = getCurrentUserId();
  if (!userId) return;

  const snapshot = await get(favouritesRef(userId));
  console.log("snapshot value is: ", snapshot);
  const favourites = await snapshot.val();
  console.log("favourites value is: ", favourites);
  console.log("typeof favourites value is: ", typeof favourites);
  const data = await JSON.parse(JSON.stringify(favourites));
  console.log("data value is: ", data);
  return data;
  // return favourites;
};

//
// auth
export const handleGoogleAuth = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

export const handleCreateUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    throw new Error(`${errorCode}: ${errorMessage}`);
  }
};

export const getCurrentUserId = () => {
  const data = auth?.currentUser?.uid;
  console.log("data value from getCurrentUserId is:", data);
  return data;
};

export const hanldeSignInWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    throw new Error(`${errorCode}: ${errorMessage}`);
  }
};

export const handleLogout = () => {
  signOut(auth);
};

export const getAuthInterface = () => auth;
