import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { RegisterForm } from "../components/forms/registerForm/RegisterForm";
import { URLS } from "../utils/constants";
import { useAppSelector } from "../utils/hooks";
import { useRouter } from "next/router";
import { userSelect } from "../lib/redux/slices/userSlice";

export const Registration = () => {
  const router = useRouter();
  // TODO it dumps on a new render or tab, always null
  const user = useAppSelector(userSelect);
  console.log(user.username);
  // guard protected route
  if (user.username) {
    router.push(URLS.home);
  }
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};

export default Registration;
