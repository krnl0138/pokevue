import React, { useReducer } from "react";
import Link from "next/link";
import { REGEX_EMAIL, REGEX_PASSWORD, URLS } from "../../../utils/constants";
import { useRouter } from "next/router";
import { InputComponent } from "../../utils/forms/InputComponent";
import { SubmitButtonComponent } from "../../utils/forms/SubmitButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { loginReducer, initialStateLogin } from "./loginFormReducer";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAppDispatch } from "../../../utils/hooks";
import {
  userLogin,
  userLoginGoogle,
} from "../../../lib/redux/slices/userSlice";
import { Google, OpenInNew } from "@mui/icons-material";
import {
  styleGlobalBorderComponent,
  styleGlobalContainerDark,
} from "../../../styles/styles";
import { InputPasswordComponent } from "../../utils/forms/PasswordComponent";
import { TMyChangeFormEvent } from "../../../utils/types";
import { useTheme } from "@mui/material/styles";

const styleMainContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  padding: 8,
  paddingTop: 6,
  boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
  textAlign: "center",
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

const lightBackground = { ...styleGlobalBorderComponent, bgcolor: "#fdfdfd" };
const darkBackground = styleGlobalContainerDark;

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

  const theme = useTheme();
  const styleMain =
    theme.palette.mode === "light"
      ? { ...styleMainContainer, ...lightBackground }
      : { ...styleMainContainer, ...darkBackground };

  const styleIconFilter =
    theme.palette.mode === "light" ? "opacity(0.05)" : "opacity(0.2)";

  const styleLink =
    theme.palette.mode === "light" ? "rgb(25 118 210)" : "#00b4f8";

  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const styleHeaderFontSize = matches ? "1.2rem" : "1.5rem";
  const styleIconMobile = matches
    ? {
        top: "3%",
        right: "38%",
        backgroundSize: "60px 60px",
        height: "60px",
        width: "60px",
      }
    : {
        top: "5%",
        right: "40%",
        backgroundSize: "80px 80px",
        height: "80px",
        width: "80px",
      };

  return (
    <Container
      maxWidth="xs"
      sx={
        matches
          ? {
              ...styleMain,
              padding: "1.5rem 1rem",
              "@media": { padding: "1.5rem 1rem" },
              " p": { fontSize: "1rem" },
            }
          : styleMain
      }
    >
      <Box
        id="login-form-header"
        sx={{
          "::before": {
            content: "''",
            position: "fixed",
            backgroundImage: `url(/pokeball_small_logo.png)`,
            ...styleIconMobile,
            backgroundRepeat: "no-repeat",
            filter: `${styleIconFilter}`,
            zIndex: "-1",
          },
        }}
      >
        <Typography
          component="p"
          variant="h4"
          sx={{
            marginBottom: 5,
            textTransform: "uppercase",
            fontSize: `${styleHeaderFontSize}`,
          }}
        >
          Pokevue
        </Typography>
      </Box>
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

      <Typography
        component="p"
        variant="body1"
        sx={{
          marginTop: 6,
          " a": {
            color: `${styleLink}`,
            textDecoration: "underline",
          },
        }}
      >
        Are you a new user?{" "}
        <Link href={URLS.register}>
          <a>
            Register
            <OpenInNew fontSize="small" sx={{ fontSize: "0.8rem" }} />
          </a>
        </Link>
      </Typography>
    </Container>
  );
};
