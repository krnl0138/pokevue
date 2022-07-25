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
    await signInWithEmailAndPassword(auth, email, password);
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
