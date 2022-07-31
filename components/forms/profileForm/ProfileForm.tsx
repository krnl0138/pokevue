import CircularProgress from "@mui/material/CircularProgress";
import { useReducer } from "react";
import { InputComponent } from "../../utils/forms/InputComponent";
import { SubmitButtonComponent } from "../../utils/forms/SubmitButtonComponent";
import { selectUser, userUpdate } from "../../../lib/redux/slices/userSlice";
import { useAppDispatch } from "../../../utils/hooks";
import { profileReducer } from "./profileFormReducer";
import { Container, Typography, Box } from "@mui/material";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../../../utils/constants";
import { InputPasswordComponent } from "../../utils/forms/PasswordComponent";
import { useAppSelector } from "../../../utils/hooks";
import { TMyChangeFormEvent } from "../../../utils/types";

const styleMainContainer = {
  marginRight: "auto",
  marginLeft: 0,
  padding: 8,
  paddingTop: 6,
  bgcolor: "#fdfdfd",
  textAlign: "center",
  "@media": { padding: 8, paddingTop: 6 },
  " p": { fontWeight: 300 },
};

const styleFormContainer = {
  display: "flex",
  flexDirection: "column",
  " > div": { margin: "10px 0" },
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
      avatar: user.avatar ? user.avatar : "",
      password: "",
    },
  });
  const { error, isLoading, isSubmitted, data } = state;
  const { email, password, username, avatar } = data;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchProfile({ type: "submit" });
    try {
      await dispatch(userUpdate(data));
      dispatchProfile({ type: "success" });
    } catch {
      dispatchProfile({ type: "failed" });
    }
  };

  const onChangeUsername = (e: TMyChangeFormEvent) => {
    dispatchProfile({
      type: "field",
      field: "username",
      value: e.currentTarget.value,
    });
  };
  const onChangeAvatar = (e: TMyChangeFormEvent) => {
    dispatchProfile({
      type: "field",
      field: "avatar",
      value: e.currentTarget.value,
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

  return (
    <Container maxWidth="xs" sx={styleMainContainer}>
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
          value={avatar}
          label="avatar url"
          // TODO url regex
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
      {/* // TODO should ideally push dif message after all db is finished */}
      {isSubmitted && (
        <Typography component="p" variant="body1">
          Successfully changed your data...
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
