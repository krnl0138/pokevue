import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";
import app from "./index";
import store from "../lib/redux";
import { setUser } from "../lib/redux/slices/userSlice";
import { addOtherUser, getOtherUser } from "../lib/redux/slices/usersSlice";

// db
const db = getDatabase(app);
const auth = getAuth(app);

const userRef = (userId: string) => ref(db, `users/${userId}`);
const favouriteRef = (userId: string, favourite: number) =>
  ref(db, `users/${userId}/favourites/${favourite}`);

export const dbWriteUserData = async (data: {
  username: string;
  email: string;
}) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const uid = user.uid;
      await set(userRef(user.uid), data);
      // as values were set dispatch new values to Redux
      onValue(userRef(user.uid), (snapshot) => {
        const value = snapshot.val();
        store.dispatch(setUser({ uid, ...value }));
      });
    } else {
      throw new Error(
        `No user is logged in. dbWriteUserData call cannot be made.`
      );
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
      const uid = user.uid;
      // create 'newUser' object from non-empty fields of 'data' arg
      // Firebase's 'update' method accepts only an object
      const newUser = <typeof data>{};
      for (const [prop, value] of Object.values(data)) {
        if (value) {
          newUser[prop as keyof typeof data] = value;
        }
      }
      await update(userRef(uid), newUser);
      // as values were updated dispatch new values to Redux
      onValue(userRef(uid), (snapshot) => {
        const value = snapshot.val();
        store.dispatch(setUser({ uid, ...value }));
      });
    } else {
      throw new Error(
        `No user is logged in. dbUpdateUserData call cannot be made.`
      );
    }
  });
};

export const dbWriteFavourite = async (favourite: number) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      set(favouriteRef(user.uid, favourite), favourite);
    } else {
      throw new Error(
        `No user is logged in. dbWriteFavourite call cannot be made.`
      );
    }
  });
};

export const dbRemoveFavourite = (favourite: number) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      remove(favouriteRef(user.uid, favourite));
    } else {
      throw new Error(
        `No user is logged in. dbRemoveFavourite call cannot be made.`
      );
    }
  });
};

export const dbGetUser = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const uid = user.uid;
      // dispatch user values to Redux
      onValue(userRef(uid), (snapshot) => {
        const value = snapshot.val();
        store.dispatch(setUser({ uid, ...value }));
      });
    } else {
      throw new Error(`No user is logged in. dbGetUser call cannot be made.`);
    }
  });
};

export const dbGetOtherUser = async (uid: string) => {
  console.log("dbGetOtherUser was called with uid ", uid);
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // dispatch user values to Redux
      onValue(userRef(uid), (snapshot) => {
        const value = snapshot.val();
        if (!value) throw new Error("No user was found in dbGetOtherUser call");
        const { username } = value;
        const avatar = value.avatar ? value.avatar : "";
        const otherUser = { uid, avatar, username };
        console.log(
          "from dbGetOtherUser the 'otherUser' object is: ",
          otherUser
        );
        store.dispatch(addOtherUser(otherUser));
      });
    } else {
      throw new Error(
        `No user is logged in. dbGetOtherUser call cannot be made.`
      );
    }
  });
};
