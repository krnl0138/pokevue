import React, { useReducer } from "react";
import Link from "next/link";
import { URLS } from "../../../utils/constants";
import { useRouter } from "next/router";
import { InputComponent } from "../InputComponent";
import { PasswordInputComponent } from "../PasswordInputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { loginReducer, initialStateLogin } from "./loginFormReducer";
import { authInterface } from "../../../firebase/authInterface";
import { Container, Typography } from "@mui/material";
import { useAppDispatch } from "../../../utils/hooks";
import { userLogin } from "../../../lib/redux/slices/userSlice";

export const LoginForm = () => {
  const auth = authInterface();
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
    <Container>
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

      {isLoggedIn && (
        <Typography component="p" variant="body1">
          Successfully logged in. Redirecting...
        </Typography>
      )}
      {error && (
        <Typography component="p" variant="body1">
          There was an error: {error}
        </Typography>
      )}

      <Typography component="p" variant="body1">
        Are you a new user?{" "}
        <Link href={URLS.register}>
          <a>Register</a>
        </Link>
      </Typography>
    </Container>
  );
};
