import CircularProgress from "@mui/material/CircularProgress";
import { useReducer } from "react";
import { InputComponent } from "../InputComponent";
import { PasswordInputComponent } from "../PasswordInputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";
import { userUpdate } from "../../../lib/redux/slices/userSlice";
import { useAppDispatch } from "../../../utils/hooks";
import { profileReducer, initialStateProfile } from "./profileFormReducer";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const [state, dispatchProfile] = useReducer(
    profileReducer,
    initialStateProfile
  );
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

  return (
    <div>
      <p>Below you can change you data</p>
      {isSubmitted && <p>Data was successfully changed!</p>}
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Your email"
          id="email"
          onChange={(e) =>
            dispatchProfile({
              type: "field",
              field: "email",
              value: e.currentTarget.value,
            })
          }
          value={email}
        />
        <InputComponent
          label="Your username"
          id="username"
          onChange={(e) =>
            dispatchProfile({
              type: "field",
              field: "username",
              value: e.currentTarget.value,
            })
          }
          value={username}
        />
        <InputComponent
          label="Your avatar url"
          id="avatar"
          onChange={(e) =>
            dispatchProfile({
              type: "field",
              field: "avatar",
              value: e.currentTarget.value,
            })
          }
          value={avatar}
        />
        <PasswordInputComponent
          id="password"
          onChange={(e) =>
            dispatchProfile({
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
          <SubmitButtonComponent title="Submit" />
        )}
      </form>

      {isSubmitted && <p>Successfully changed your data.</p>}
      {error && <p>There was an error: {error}</p>}
    </div>
  );
};
