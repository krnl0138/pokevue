import { getAuth } from "firebase/auth";
import { getDatabase, get, ref, set, update, remove, onValue } from "firebase/database";
import app from "./index";
import store from "../lib/redux";
import { setUser } from "../lib/redux/slices/userSlice";

// db
const db = getDatabase(app);
const auth = getAuth(app);

const userRef = (userId: string) => ref(db, `users/${userId}`);
const favouriteRef = (userId: string, favourite: number) => ref(db, `users/${userId}/favourites/${favourite}`);

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
      set(favouriteRef(user.uid,favourite), favourite);
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbRemoveFavourite = (favourite: number) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      remove(favouriteRef(user.uid, favourite));
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbGetUser = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      onValue(userRef(user.uid), (snapshot) => {
        const value = snapshot.val();
      console.log( "dbGetUser was called. user value that passed into setUser dispatch is:", value);
      store.dispatch(setUser(value));
      })
      // const userSnapshot = await get(userRef(user.uid));
      // const value = await userSnapshot.val();
      // store.dispatch(setUser(value));
      //   return userSnapshot?.val();
      // TODO TEST CODE REMOVE TO USE DB
      // store.dispatch(setUser(fakeUser));
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};
