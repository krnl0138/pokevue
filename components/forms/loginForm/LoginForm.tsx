import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  resetLoginFormValue,
  selectLoginForm,
  setLoginFormValue,
} from "../../../lib/redux/slices/loginFormSlice";
import React from "react";
import Link from "next/link";
import { URLS } from "../../../utils/constants";
import { dbGetUser, hanldeSignInWithEmailPassword } from "../../../database";
import { useRouter } from "next/router";
import { InputComponent } from "../InputComponent";
import { PasswordInputComponent } from "../PasswordInputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { email, password } = useAppSelector(selectLoginForm);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await hanldeSignInWithEmailPassword(email, password);
    await dbGetUser();
    dispatch(resetLoginFormValue());
    router.push(URLS.home);
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
        Are you a new user? <Link href={URLS.register}>Register</Link>
      </p>
    </div>
  );
};
