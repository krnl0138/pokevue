import React, { useEffect } from "react";
import { Layout } from "../components/utils/layout/Layout";
import { LoginForm } from "../components/forms/loginForm/LoginForm";
import { useRouter } from "next/router";
import { useAppSelector } from "../utils/hooks";
import { PROJECT_URLS as urls } from "../utils/constants";

export const Login = () => {
  const router = useRouter();
  // TODO it dumps on a new render or tab, always null
  const user = useAppSelector((state) => state.user);
  // guard protected route
  if (user.username) {
    return router.push(urls.home);
  }
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Login;
