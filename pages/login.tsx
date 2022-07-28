import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { LoginForm } from "../components/forms/loginForm/LoginForm";
import { useRouter } from "next/router";
import { useAppSelector } from "../utils/hooks";
import { URLS } from "../utils/constants";
import { selectUser } from "../lib/redux/slices/userSlice";

export const Login = () => {
  const router = useRouter();
  // TODO it dumps on a new render or tab, always null
  const user = useAppSelector(selectUser);
  // guard protected route
  if (user.username) {
    return router.push(URLS.home);
  }
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Login;
