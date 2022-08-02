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
import { composeObjFromNonEmpty } from "../utils/functions";

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
  if (!uid || !data)
    throw new Error("No uid or data were provided in dbWriteUserData call!");
  console.log("fired dbWriteUserData with: ", uid);
  console.log("fired dbWriteUserData with: ", data);
  onValue(userRef(uid), async (snapshot) => {
    if (snapshot.exists()) return;
    await set(userRef(uid), data);
    const value = snapshot.val();
    store.dispatch(setUser({ uid, ...value }));
  });
};

export const dbUpdateUserData = async (
  uid: TUser["uid"],
  data: {
    avatar?: string;
    username?: string;
    email?: string;
  }
) => {
  if (!uid || !data) return;
  console.log("fired dbUpdateUserData with: ", data);
  /*
   * compose 'newUser' object from non-empty fields of 'data'
   * Firebase's 'update' method accepts only an object
   */
  const newUser = composeObjFromNonEmpty(data);
  console.log("final object is:", newUser);
  await update(userRef(uid), newUser);
  onValue(userRef(uid), (snapshot) => {
    const value = snapshot.val();
    store.dispatch(setUser({ uid, ...value }));
  });
};

export const dbWriteFavourite = async (
  uid: TUser["uid"],
  favourite: number
) => {
  if (!uid || !favourite) return;
  set(favouriteRef(uid, favourite), favourite);
};

export const dbRemoveFavourite = (uid: TUser["uid"], favourite: number) => {
  if (!uid || !favourite) return;
  remove(favouriteRef(uid, favourite));
};

export const dbGetUser = async (uid: TUser["uid"]) => {
  if (!uid) return;
  onValue(userRef(uid), (snapshot) => {
    const value = snapshot.val();
    store.dispatch(setUser({ uid, ...value }));
    // console.log("from dbGetUser returning the value");
    // return value;
  });
};

export const dbGetOtherUser = async (uid: TUser["uid"]) => {
  if (!uid) return;
  console.log("dbGetOtherUser was called with uid ", uid);
  onValue(userRef(uid), (snapshot) => {
    const value = snapshot.val();
    if (!value) throw new Error("No user was found in dbGetOtherUser call");
    const { username, avatar } = value;
    const otherUser = { uid, username, avatar };
    console.log("from dbGetOtherUser the 'otherUser' object is: ", otherUser);
    store.dispatch(addOtherUser(otherUser));
  });
};
