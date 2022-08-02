import { Google } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { REGEX_EMAIL, REGEX_PASSWORD, URLS } from "../../../utils/constants";
import { useRouter } from "next/router";
import { SubmitButtonComponent } from "../../utils/forms/SubmitButtonComponent";
import { useReducer } from "react";
import { useAppDispatch } from "../../../utils/hooks";
import {
  userLoginGoogle,
  userRegister,
} from "../../../lib/redux/slices/userSlice";
import { initialStateRegister, registerReducer } from "./registerFormReducer";
import {
  styleGlobalBorderComponent,
  styleGlobalContainerDark,
} from "../../../styles/styles";
import { InputPasswordComponent } from "../../utils/forms/PasswordComponent";
import { InputComponent } from "../../utils/forms/InputComponent";
import { TMyChangeFormEvent } from "../../../utils/types";

const styleMainContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  padding: 8,
  paddingTop: 6,
  bgcolor: "#fdfdfd",
  ...styleGlobalBorderComponent,
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

export const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, dispatchRegister] = useReducer(
    registerReducer,
    initialStateRegister
  );
  const { error, isLoading, isRegistered, data } = state;
  const { password, email, username } = data;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchRegister({ type: "register" });
    try {
      dispatch(userRegister(data));
      dispatchRegister({ type: "success" });
      router.push(URLS.home);
    } catch {
      dispatchRegister({ type: "failed" });
    }
  };

  const onChangeUsername = (e: TMyChangeFormEvent) => {
    dispatchRegister({
      type: "field",
      field: "username",
      value: e.currentTarget.value,
    });
  };
  const onChangeEmail = (e: TMyChangeFormEvent) => {
    dispatchRegister({
      type: "field",
      field: "email",
      value: e.currentTarget.value,
    });
  };
  const onChangePassword = (e: TMyChangeFormEvent) => {
    dispatchRegister({
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

  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const styleHeaderFontSize = smScreen ? "1.2rem" : "1.5rem";
  const styleIconMobile = smScreen
    ? {
        top: "10%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        height: "60px",
        width: "60px",
        backgroundSize: "60px 60px",
      }
    : {
        top: "5%",
        right: "40%",
        height: "80px",
        width: "80px",
        backgroundSize: "80px 80px",
      };

  return (
    <Container
      maxWidth="xs"
      sx={
        smScreen
          ? {
              ...styleMain,
              padding: "1.5rem 1rem",
              "@media": { padding: "1.5rem 1rem" },
              " p": { fontSize: "1rem" },
            }
          : mdScreen
          ? {
              ...styleMain,
              padding: "1.5rem 3rem",
              "@media": { padding: "1.5rem 3rem" },
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
          value={username}
          label="username"
          onChange={onChangeUsername}
        />

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
          <SubmitButtonComponent text="Register" />
        )}

        <Button
          onClick={() => dispatch(userLoginGoogle())}
          type="button"
          variant="contained"
        >
          <Google />
        </Button>
      </Box>

      {isRegistered && (
        <Typography component="p" variant="body1">
          Successful registration in. Redirecting...
        </Typography>
      )}
      {error && (
        <Typography component="p" variant="body1">
          There was an error: {error}
        </Typography>
      )}
    </Container>
  );
};
