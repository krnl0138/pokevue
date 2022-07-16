// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { get, getDatabase, onValue, push, ref, set } from "firebase/database";
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
export const auth = getAuth(app);
export const db = getDatabase(app);

//
// db
// export const writeNewUserData = (userId: number, user: User) => {
export const writeUserData = (userId: string, data: User) => {
  const userRef = ref(db, `users/${userId}`);
  set(userRef, data);
};
export const writeUserFavourite = async (userId: string, favourite: number) => {
  const favouriteRef = ref(db, `users/${userId}/favourites/${favourite}`);
  set(favouriteRef, favourite);
};

// TODO
export const removeUserFavourite = (userId: string, favourite: number) => {
  const favouritesRef = ref(db, `users/${userId}/favourites`);
  // to be implemented...
};

export const readUserData = () => {
  const userId = auth?.currentUser?.uid;
  const userDataRef = ref(db, "users/" + userId);
  onValue(userDataRef, (snapshot) => {
    const data = snapshot.val();
    return data;
    // updateStarCount(postElement, data);
  });
};

// return user favourites from db
export const getUserFavourites = async () => {
  const userId = await getCurrentUserId();
  const favouritesRef = ref(db, `users/${userId}/favourites`);
  const snapshot = await get(favouritesRef);
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

export const handleCreateUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (e) {
    const errorCode = e.code;
    const errorMessage = e.message;
    throw new Error(`${errorCode}: ${errorMessage}`);
  }
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
};

export const getCurrentUserId = () => {
  return auth?.currentUser?.uid;
};
