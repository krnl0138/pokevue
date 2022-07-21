import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  resetLoginFormValue,
  setLoginFormValue,
} from "../../../lib/redux/slices/loginFormSlice";
import React from "react";
import Link from "next/link";
import { PROJECT_URLS as urls } from "../../../utils/constants";
import { dbGetUser, hanldeSignInWithEmailPassword } from "../../../database";
import { useRouter } from "next/router";
import { InputComponent } from "../InputComponent";
import { PasswordInputComponent } from "../PasswordInputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { email, password } = useAppSelector((state) => state.loginForm);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await hanldeSignInWithEmailPassword(email, password);
    await dbGetUser();
    dispatch(resetLoginFormValue());
    router.push(urls.home);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Enter your email"
          id="email"
          action={setLoginFormValue}
          value={email}
        />
        <PasswordInputComponent
          id="password"
          action={setLoginFormValue}
          value={password}
        />
        <SubmitButtonComponent title="Login" />
      </form>

      <p>
        Are you a new user? <Link href={urls.register}>Register</Link>
      </p>
    </div>
  );
};
