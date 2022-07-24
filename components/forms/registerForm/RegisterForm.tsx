import { Google, Send } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { URLS } from "../../../utils/constants";
import { useRouter } from "next/router";
import { InputComponent } from "../InputComponent";
import { PasswordInputComponent } from "../PasswordInputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";
import { useReducer } from "react";
import { useAppDispatch } from "../../../utils/hooks";
import {
  userLoginGoogle,
  userRegister,
} from "../../../lib/redux/slices/userSlice";
import { initialStateRegister, registerReducer } from "./registerFormReducer";

export const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, dispatchRegister] = useReducer(
    registerReducer,
    initialStateRegister
  );
  const { error, isLoading, isRegistered, data } = state;
  const { password, email, username } = data;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchRegister({ type: "register" });
    try {
      await dispatch(userRegister(data));
      dispatchRegister({ type: "success" });
      router.push(URLS.home);
    } catch {
      dispatchRegister({ type: "failed" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Your email"
          id="email"
          onChange={(e) =>
            dispatchRegister({
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
            dispatchRegister({
              type: "field",
              field: "username",
              value: e.currentTarget.value,
            })
          }
          value={username}
        />
        <PasswordInputComponent
          id="password"
          onChange={(e) =>
            dispatchRegister({
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
          <SubmitButtonComponent title="Register" />
        )}

        <Button
          onClick={() => dispatch(userLoginGoogle())}
          type="button"
          variant="contained"
          endIcon={<Send />}
        >
          <Google />
        </Button>

        {isRegistered && <p>Successfully registered you. Redirecting...</p>}
        {error && <p>There was an error: {error}</p>}
      </form>
    </div>
  );
};
