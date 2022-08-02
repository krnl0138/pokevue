import {
  authCreateUser,
  authGoogleAuth,
  authLogout,
  authSignInWithEmailPassword,
  authUpdateEmail,
  authUpdatePassword,
} from "../../firebase/auth";

/*
 * An agnostic auth provider for Redux.
 * Usage: const auth = authInterface();
 */
export const authInterface = () => {
  const login = async (email: string, password: string) => {
    const user = await authSignInWithEmailPassword(email, password);
    return user;
  };
  const loginWithGoolge = async () => {
    const user = await authGoogleAuth();
    return user;
  };
  const register = async (email: string, password: string) => {
    const user = await authCreateUser(email, password);
    return user;
  };
  const logout = () => authLogout();
  const updateEmail = async (email: string) => await authUpdateEmail(email);
  const updatePassword = async (password: string) => {
    await authUpdatePassword(password);
  };

  return {
    login,
    loginWithGoolge,
    register,
    logout,
    updateEmail,
    updatePassword,
  };
};
