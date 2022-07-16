import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { RegisterForm } from "../components/forms/registerForm/RegisterForm";
import { PROJECT_URLS as urls } from "../utils/constants";
import { useAppSelector } from "../utils/hooks";
import { useRouter } from "next/router";

export const Registration = () => {
  const router = useRouter();
  // TODO it dumps on a new render or tab, always null
  const user = useAppSelector((state) => state.user);
  console.log(user.username);
  // guard protected route
  if (user.username) {
    router.push(urls.main);
  }
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};

export default Registration;
