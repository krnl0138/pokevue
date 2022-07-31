import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateEmail,
  getAuth,
} from "firebase/auth";
import app from "./index";

const auth = getAuth(app);

export const authGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential)
      throw new Error(
        "Something went wrong no credential were provided by Google. Try again."
      );
    // const token = credential.accessToken;
    const user = result.user;
    return user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return `An error happened during login: ${errorCode}: ${errorMessage}`;
  }
};

export const authCreateUser = async (email: string, password: string) => {
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

export const authSignInWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
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

export const authLogout = () => {
  signOut(auth);
};

export const authUpdatePassword = async (newPassword: string) => {
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
      throw new Error(
        `No user is logged in. authUpdatePassword call cannot be made.`
      );
    }
  });
};
export const authUpdateEmail = async (newEmail: string) => {
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
      throw new Error(
        `No user is logged in. authUpdateEmail call cannot be made.`
      );
    }
  });
};
