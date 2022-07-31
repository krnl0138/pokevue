import React, { useReducer } from "react";
import Link from "next/link";
import { REGEX_EMAIL, REGEX_PASSWORD, URLS } from "../../../utils/constants";
import { useRouter } from "next/router";
import { InputComponent } from "../../utils/forms/InputComponent";
import { SubmitButtonComponent } from "../../utils/forms/SubmitButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { loginReducer, initialStateLogin } from "./loginFormReducer";
import { Box, Button, Container, Typography } from "@mui/material";
import { useAppDispatch } from "../../../utils/hooks";
import {
  userLogin,
  userLoginGoogle,
} from "../../../lib/redux/slices/userSlice";
import { Google } from "@mui/icons-material";
import { styleGlobalBorderComponent } from "../../../styles/styles";
import { InputPasswordComponent } from "../../utils/forms/PasswordComponent";
import { TMyChangeFormEvent } from "../../../utils/types";

const styleMainContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  padding: 8,
  paddingTop: 6,
  bgcolor: "#fdfdfd",
  boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
  textAlign: "center",
  ...styleGlobalBorderComponent,
  ":hover": {
    boxShadow: "rgb(0 0 0 / 24%) 0px 5px 12px",
  },
  "@media": { padding: 8, paddingTop: 6 },
  " p": { fontWeight: 300 },
};

const styleFormContainer = {
  display: "flex",
  flexDirection: "column",
  " > div": { margin: "10px 0" },
};

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, dispatchLogin] = useReducer(loginReducer, initialStateLogin);
  const { isLoggedIn, isLoading, error, data } = state;
  const { email, password } = data;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchLogin({ type: "login" });
    try {
      dispatch(userLogin(data));
      dispatchLogin({ type: "success" });
      router.push(URLS.home);
    } catch {
      dispatchLogin({ type: "failed" });
    }
  };

  const onChangeEmail = (e: TMyChangeFormEvent) => {
    dispatchLogin({
      type: "field",
      field: "email",
      value: e.currentTarget.value,
    });
  };
  const onChangePassword = (e: TMyChangeFormEvent) => {
    dispatchLogin({
      type: "field",
      field: "password",
      value: e.currentTarget.value,
    });
  };

  return (
    <Container maxWidth="xs" sx={styleMainContainer}>
      <Typography component="p" variant="h4" sx={{ marginBottom: 5 }}>
        Pokevue
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styleFormContainer}>
        <InputComponent
          required={true}
          value={email}
          label="email"
          regex={REGEX_EMAIL}
          onChange={onChangeEmail}
        />

        <InputPasswordComponent
          required={true}
          value={password}
          regex={REGEX_PASSWORD}
          onChange={onChangePassword}
        />

        {isLoading ? (
          <CircularProgress />
        ) : (
          <SubmitButtonComponent text="Login" />
        )}

        <Button
          onClick={() => dispatch(userLoginGoogle())}
          type="button"
          variant="contained"
        >
          <Google />
        </Button>
      </Box>

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

      <Typography component="p" variant="body1" sx={{ marginTop: 6 }}>
        Are you a new user?{" "}
        <Link href={URLS.register}>
          <a>Register</a>
        </Link>
      </Typography>
    </Container>
  );
};
