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
} from "firebase/auth";
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import store from "../lib/redux";
import { setUser } from "../lib/redux/slices/userSlice";
import * as fakeUser from "../public/fakeUser.json";
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

export const dbWriteUserData = async (data: {
  username: string;
  email: string;
}) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await set(userRef(user.uid), data);
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbUpdateUserData = async (data: {
  username: string;
  email: string;
  avatar: string;
}) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const newUser = <typeof data>{};
      for (const [prop, value] of Object.entries(data)) {
        if (value) {
          newUser[prop as keyof typeof data] = value;
        }
      }
      await update(userRef(user.uid), newUser);
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};
export const dbWriteFavourite = async (favourite: number) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const favouriteRef = ref(db, `users/${user.uid}/favourites/${favourite}`);
      set(favouriteRef, favourite);
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbRemoveFavourite = (favourite: number) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const favouriteRef = ref(db, `users/${user.uid}/favourites/${favourite}`);
      remove(favouriteRef);
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbGetUser = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userSnapshot = await get(userRef(user.uid));
      // store.dispatch(setUser(userSnapshot.val()));
      return userSnapshot.val();
      // TODO TEST CODE REMOVE TO USE DB
      // store.dispatch(setUser(fakeUser));
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

//
// auth
export const handleGoogleAuth = async () => {
  await signInWithPopup(auth, new GoogleAuthProvider());
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

export const handleUpdatePassword = async (newPassword: string) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      try {
        updatePassword(user, newPassword);
      } catch (e: any) {
        const errorCode = e.code;
        const errorMessage = e.message;
        throw new Error(`${errorCode}: ${errorMessage}`);
      }
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};
export const handleUpdateEmail = async (newEmail: string) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      try {
        updateEmail(user, newEmail);
      } catch (e: any) {
        const errorCode = e.code;
        const errorMessage = e.message;
        throw new Error(`${errorCode}: ${errorMessage}`);
      }
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};
