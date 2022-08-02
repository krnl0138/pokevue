import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginForm } from "../components/forms/loginForm/LoginForm";
import { Layout } from "../components/utils/layout/Layout";
import { URLS } from "../utils/constants";

export const Login = () => {
  const router = useRouter();
  const auth = getAuth();
  const [isUser, setIsUser] = useState(false);
  // guard protected route
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true);
        router.push(URLS.home);
      } else {
        setIsUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    !isUser && (
      <Layout>
        <LoginForm />
      </Layout>
    )
  );
};

export default Login;
