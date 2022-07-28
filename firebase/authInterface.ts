import {
  authCreateUser,
  authGoogleAuth,
  authLogout,
  authSignInWithEmailPassword,
  authUpdateEmail,
  authUpdatePassword,
} from "./auth";

// An agnostic auth provider for Redux
// Usage: const auth = authProvider();
export const authInterface = () => {
  const login = async (email: string, password: string) => {
    await authSignInWithEmailPassword(email, password);
  };
  const loginWithGoolge = async () => {
    await authGoogleAuth();
  };
  const register = async (email: string, password: string) => {
    await authCreateUser(email, password);
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
