import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { dbInterface } from "../lib/api/dbInterface";
import store from "../lib/redux";
import { setUserAvatar } from "../lib/redux/slices/userSlice";
import { TUser } from "../utils/types";
import app from "./index";

const storage = getStorage(app);
const avatarsByUidRef = (uid: TUser["uid"]) => ref(storage, `avatars/${uid}`);

export const storageUploadAvatar = async (
  uid: TUser["uid"],
  file: File,
  withGoogle = false
) => {
  /* check if avatar exists when logging in with Google provider */
  const db = dbInterface();
  if (withGoogle && avatarsByUidRef(uid).name) return;
  const snapshot = await uploadBytes(avatarsByUidRef(uid), file);
  if (snapshot) {
    console.log("Uploaded a blob or file!");
    const avatar = await getDownloadURL(avatarsByUidRef(uid));
    db.updateUser(uid, { avatar });
    // store.dispatch(setUserAvatar({ uid, avatar }));
  }
};

export const storageDownloadAvatar = async (uid: TUser["uid"]) => {
  console.log("storageDownloadAvatar was called with: ", uid);
  avatarsByUidRef(uid).bucket;
  try {
    const avatar = await getDownloadURL(avatarsByUidRef(uid));
    if (!avatar) return;
    store.dispatch(setUserAvatar({ uid, avatar }));
  } catch (error) {
    /* Had to swallow error, because there is no way to check if path exists in Firebase Storage */
    return;
  }
};
