import { Google, Send } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  resetRegisterFormValue,
  setRegisterFormValue,
} from "../../../lib/redux/slices/registerFormSlice";
import {
  handleCreateUser,
  handleGoogleAuth,
  dbWriteUserData,
  dbGetUser,
} from "../../../database";
import { PROJECT_URLS as urls } from "../../../utils/constants";
import { useRouter } from "next/router";
import { InputWrapper } from "../InputWrapper";
import { PasswordInputWrapper } from "../PasswordInputWrapper";
import { SubmitButtonWrapper } from "../SubmitButtonWrapper";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { username, email, password } = useAppSelector(
    (state) => state.registerForm
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO abstract to /lib/api as registerUser()
    await handleCreateUser(email, password);
    const newUser = { username, email };
    await dbWriteUserData(newUser);
    await dbGetUser();
    dispatch(resetRegisterFormValue());
    router.push(urls.home);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputWrapper
          label="Your email"
          id="email"
          action={setRegisterFormValue}
          value={email}
        />
        <InputWrapper
          label="Your username"
          id="username"
          action={setRegisterFormValue}
          value={username}
        />
        <PasswordInputWrapper
          id="password"
          action={setRegisterFormValue}
          value={password}
        />
        <SubmitButtonWrapper title="Register" />

        <Button
          onClick={handleGoogleAuth}
          type="button"
          variant="contained"
          endIcon={<Send />}
        >
          <Google />
        </Button>
      </form>
    </div>
  );
};
