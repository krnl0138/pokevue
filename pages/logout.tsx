import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { resetUser } from "../lib/redux/slices/userSlice";
import { URLS } from "../utils/constants";
import { useAppDispatch } from "../utils/hooks";

const Logout = () => {
  const router = useRouter();
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRedirect = () => router.push(URLS.home);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        signOut(auth).then(() => {
          dispatch(resetUser());
          router.push(URLS.login);
        });
      } else {
        handleRedirect();
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch, router]);
};

export default Logout;
