import React, { useReducer } from "react";
import Link from "next/link";
import { URLS } from "../../../utils/constants";
import { useRouter } from "next/router";
import { InputComponent } from "../InputComponent";
import { PasswordInputComponent } from "../PasswordInputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { userLogin } from "../../../lib/redux/slices/userSlice";
import { useAppDispatch } from "../../../utils/hooks";
import { loginReducer, initialStateLogin } from "./loginFormReducer";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, dispatchLogin] = useReducer(loginReducer, initialStateLogin);
  const { isLoggedIn, isLoading, error, data } = state;
  const { email, password } = data;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchLogin({ type: "login" });
    try {
      await dispatch(userLogin(data));
      dispatchLogin({ type: "success" });
      router.push(URLS.home);
    } catch {
      dispatchLogin({ type: "failed" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Enter your email"
          id="email"
          onChange={(e) =>
            dispatchLogin({
              type: "field",
              field: "email",
              value: e.currentTarget.value,
            })
          }
          value={email}
        />
        <PasswordInputComponent
          id="password"
          onChange={(e) =>
            dispatchLogin({
              type: "field",
              field: "password",
              value: e.currentTarget.value,
            })
          }
          value={password}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <SubmitButtonComponent title="Login" />
        )}
      </form>

      {isLoggedIn && <p>Successfully logged in. Redirecting...</p>}
      {error && <p>There was an error: {error}</p>}

      <p>
        Are you a new user?{" "}
        <Link href={URLS.register}>
          <a>Register</a>
        </Link>
      </p>
    </div>
  );
};
