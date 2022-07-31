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
import { addOtherUser } from "../lib/redux/slices/usersSlice";
import { TUser } from "../utils/types";

// db
const db = getDatabase(app);

const userRef = (userId: string) => ref(db, `users/${userId}`);
const favouriteRef = (userId: string, favourite: number) =>
  ref(db, `users/${userId}/favourites/${favourite}`);

export const dbWriteUserData = async (
  uid: TUser["uid"],
  data: {
    username: string;
    email: string;
  }
) => {
  await set(userRef(uid), data);
  // as values were set dispatch new values to Redux
  onValue(userRef(uid), (snapshot) => {
    const value = snapshot.val();
    store.dispatch(setUser({ uid, ...value }));
  });
};

export const dbUpdateUserData = async (
  uid: TUser["uid"],
  data: {
    username: string;
    email: string;
    avatar: string;
  }
) => {
  console.log("fired dbUpdateUserData with: ", data);
  // create 'newUser' object from non-empty fields of 'data' arg
  // Firebase's 'update' method accepts only an object
  const newUser = <typeof data>{};
  Object.entries(data).map(([key, value]) => {
    if (value) newUser[key as keyof typeof data] = value;
  });
  console.log("final object is:", newUser);
  await update(userRef(uid), newUser);
  // as values were updated dispatch new values to Redux
  onValue(userRef(uid), (snapshot) => {
    const value = snapshot.val();
    store.dispatch(setUser({ uid, ...value }));
  });
};

export const dbWriteFavourite = async (
  uid: TUser["uid"],
  favourite: number
) => {
  set(favouriteRef(uid, favourite), favourite);
};

export const dbRemoveFavourite = (uid: TUser["uid"], favourite: number) => {
  remove(favouriteRef(uid, favourite));
};

export const dbGetUser = async (uid: TUser["uid"]) => {
  onValue(userRef(uid), (snapshot) => {
    const value = snapshot.val();
    store.dispatch(setUser({ uid, ...value }));
    console.log("from dbGetUser returning the value");
    return value;
    // store.dispatch(userGetAsyncThunk.fulfilled(store.user, { uid, ...value }));
  });
};

export const dbGetOtherUser = async (uid: TUser["uid"]) => {
  console.log("dbGetOtherUser was called with uid ", uid);
  onValue(userRef(uid), (snapshot) => {
    const value = snapshot.val();
    if (!value) throw new Error("No user was found in dbGetOtherUser call");
    const { username } = value;
    const avatar = value.avatar ? value.avatar : "";
    const otherUser = { uid, avatar, username };
    console.log("from dbGetOtherUser the 'otherUser' object is: ", otherUser);
    store.dispatch(addOtherUser(otherUser));
  });
};
