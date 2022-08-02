import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useReducer } from "react";
import { InputComponent } from "../../utils/forms/InputComponent";
import { SubmitButtonComponent } from "../../utils/forms/SubmitButtonComponent";
import { selectUser, userUpdate } from "../../../lib/redux/slices/userSlice";
import { useAppDispatch } from "../../../utils/hooks";
import { profileReducer } from "./profileFormReducer";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../../../utils/constants";
import { InputPasswordComponent } from "../../utils/forms/PasswordComponent";
import { useAppSelector } from "../../../utils/hooks";
import { TMyChangeFormEvent } from "../../../utils/types";
import {
  isAvatarTypeImage,
  isAvatarSizePassed,
} from "../../../utils/functions";

const styleMainContainerBackground = { bgcolor: "#fdfdfd" };

const styleMainContainer = {
  marginRight: 0,
  marginLeft: 0,
  padding: 8,
  paddingTop: 6,
  textAlign: "center",
  "@media": { padding: 8, paddingTop: 6 },
  " p": { fontWeight: 300 },
};

const styleFormContainer = {
  display: "flex",
  flexDirection: "column",
  " > div": { margin: "10px 0" },
};

const styleSuccessMessage = {
  color: "#2a9d8f",
  animationName: "hide",
  animationDuration: "5s",
  "@keyframes hide": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
};

const styleErrorMessage = {
  color: "#e63946",
  animationName: "hide",
  animationDuration: "10s",
  "@keyframes hide": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
};

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [state, dispatchProfile] = useReducer(profileReducer, {
    error: "",
    isSubmitted: false,
    isLoading: false,
    data: {
      username: user.username ? user.username : "",
      email: user.email ? user.email : "",
      avatar: null,
      password: "",
    },
  });
  const { error, isLoading, isSubmitted, data } = state;
  const { email, password, username } = data;

  /* Status messages state */
  useEffect(() => {
    if (!error) return;
    const errorElement = document.getElementById("profileForm-error");
    if (!errorElement) return;
    setTimeout(() => {
      errorElement.style.display = "none";
    }, 10000);
  }, [error]);

  useEffect(() => {
    if (!isSubmitted) return;
    const successElement = document.getElementById("profileForm-success");
    if (!successElement) return;
    setTimeout(() => {
      successElement.style.display = "none";
    }, 10000);
  }, [isSubmitted]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchProfile({ type: "submit" });
    try {
      dispatch(userUpdate(data));
    } catch {
      dispatchProfile({
        type: "failed",
        value: "An error occured while updating your data. Try again",
      });
    }
    dispatchProfile({ type: "success" });
  };

  const onChangeUsername = (e: TMyChangeFormEvent) => {
    dispatchProfile({
      type: "field",
      field: "username",
      value: e.currentTarget.value,
    });
  };

  const onChangeAvatar = (e: TMyChangeFormEvent) => {
    // TODO this logic should be in the reducer
    const image = (e.currentTarget as HTMLInputElement).files?.[0];
    if (!image) return;
    if (!isAvatarTypeImage(image) || !isAvatarSizePassed(image)) {
      e.currentTarget.value = "";
      dispatchProfile({ type: "wrongAvatar", value: image });
      return;
    }
    dispatchProfile({
      type: "field",
      field: "avatar",
      value: image,
    });
  };

  const onChangeEmail = (e: TMyChangeFormEvent) => {
    dispatchProfile({
      type: "field",
      field: "email",
      value: e.currentTarget.value,
    });
  };

  const onChangePassword = (e: TMyChangeFormEvent) => {
    dispatchProfile({
      type: "field",
      field: "password",
      value: e.currentTarget.value,
    });
  };

  const theme = useTheme();
  return (
    <Container
      maxWidth="xs"
      sx={
        theme.palette.mode === "light"
          ? { ...styleMainContainer, ...styleMainContainerBackground }
          : styleMainContainer
      }
    >
      <Typography component="p" variant="h5" sx={{ marginBottom: "1rem" }}>
        Change your data below
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styleFormContainer}>
        <InputComponent
          value={username}
          label="username"
          onChange={onChangeUsername}
        />

        <InputComponent
          value={email}
          label="email"
          regex={REGEX_EMAIL}
          onChange={onChangeEmail}
        />

        <InputComponent
          type="file"
          label=""
          helperText="Upload avatar image"
          onChange={onChangeAvatar}
        />

        <InputPasswordComponent
          value={password}
          regex={REGEX_PASSWORD}
          onChange={onChangePassword}
        />

        {isLoading ? (
          <CircularProgress />
        ) : (
          <SubmitButtonComponent text="Submit" />
        )}
      </Box>

      {isSubmitted && (
        <Typography
          id="profileForm-success"
          component="p"
          variant="body1"
          sx={styleSuccessMessage}
        >
          Successfully changed your data
        </Typography>
      )}
      {error && (
        <Typography
          id="profileForm-error"
          component="p"
          variant="body1"
          sx={styleErrorMessage}
        >
          {error}
        </Typography>
      )}
    </Container>
  );
};
