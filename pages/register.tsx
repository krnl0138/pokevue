import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RegisterForm } from "../components/forms/registerForm/RegisterForm";
import { Layout } from "../components/utils/layout/Layout";
import { URLS } from "../utils/constants";

export const Registration = () => {
  const router = useRouter();
  const auth = getAuth();
  const [isUser, setIsUser] = useState(false);
  // guard protected route
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true);
        return router.push(URLS.home);
      } else {
        setIsUser(false);
        return;
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  return (
    !isUser && (
      <Layout>
        <RegisterForm />
      </Layout>
    )
  );
};

export default Registration;
