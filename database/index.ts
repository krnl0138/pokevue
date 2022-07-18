// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth";
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
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
const favouritesRef = (userId: string) => ref(db, `users/${userId}/favourites`);

export const dbWriteUserData = (data: User) => {
  if (!auth?.currentUser?.uid) {
    throw new Error(`No user is logged in. Function call cannot be made.`);
  }
  // TODO error handling
  // TODO dangerous should be listenable per docs.
  const userId = auth.currentUser.uid;
  set(userRef(userId), data);
};

export const dbUpdateUserData = async (data: User) => {
  if (!auth?.currentUser?.uid) {
    throw new Error(`No user is logged in. Function call cannot be made.`);
  }
  const newUser = {};

  // TODO dangerous should be listenable per docs.
  const userId = auth.currentUser.uid;
  // drop empty fields on passed object
  for (const [prop, value] of Object.entries(data)) {
    if (value) newUser[prop] = value;
  }
  const res = await update(userRef(userId), newUser);
  return res;
};
export const dbWriteFavourite = async (favourite: number) => {
  if (!auth?.currentUser?.uid) {
    throw new Error(`No user is logged in. Function call cannot be made.`);
  }
  // TODO dangerous should be listenable per docs.
  const userId = auth.currentUser.uid;
  const favouriteRef = ref(db, `users/${userId}/favourites/${favourite}`);
  set(favouriteRef, favourite);
};

export const dbRemoveFavourite = (favourite: number) => {
  if (!auth?.currentUser?.uid) {
    throw new Error(`No user is logged in. Function call cannot be made.`);
  }
  // TODO dangerous should be listenable per docs.
  const userId = auth.currentUser.uid;
  const favouriteRef = ref(db, `users/${userId}/favourites/${favourite}`);
  remove(favouriteRef);
};

export const dbGetUser = async () => {
  if (!auth?.currentUser?.uid) {
    throw new Error(`No user is logged in. Function call cannot be made.`);
  }
  // TODO dangerous should be listenable per docs.
  const userId = auth.currentUser.uid;
  const userSnapshot = await get(userRef(userId));
  return userSnapshot.val();
};

export const dbGetFavourites = async () => {
  if (!auth?.currentUser?.uid) {
    throw new Error(`No user is logged in. Function call cannot be made.`);
  }
  // TODO dangerous should be listenable per docs.
  const userId = auth.currentUser.uid;
  const snapshot = await get(favouritesRef(userId));
  const favourites = snapshot.val();
  return favourites;
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

export const hanldeSignInWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
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

export const handleUpdatePassword = async (newPassword: string) => {
  if (!auth?.currentUser?.uid) {
    throw new Error(
      `No user is logged in. ${handleUpdateEmail.name} call cannot be made.`
    );
  }
  try {
    updatePassword(auth.currentUser, newPassword);
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    throw new Error(`${errorCode}: ${errorMessage}`);
  }
};
export const handleUpdateEmail = async (newEmail: string) => {
  if (!auth?.currentUser?.uid) {
    throw new Error(
      `No user is logged in. ${handleUpdateEmail.name} call cannot be made.`
    );
  }
  try {
    updateEmail(auth.currentUser, newEmail);
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    throw new Error(`${errorCode}: ${errorMessage}`);
  }
};
