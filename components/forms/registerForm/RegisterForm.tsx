import { Google, Send } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  resetRegisterFormValue,
  selectRegisterForm,
  setRegisterFormValue,
} from "../../../lib/redux/slices/registerFormSlice";
import {
  handleCreateUser,
  handleGoogleAuth,
  dbWriteUserData,
  dbGetUser,
} from "../../../database";
import { URLS } from "../../../utils/constants";
import { useRouter } from "next/router";
import { InputComponent } from "../InputComponent";
import { PasswordInputComponent } from "../PasswordInputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { username, email, password } = useAppSelector(selectRegisterForm);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO abstract to /lib/api as registerUser()
    await handleCreateUser(email, password);
    const newUser = { username, email };
    await dbWriteUserData(newUser);
    await dbGetUser();
    dispatch(resetRegisterFormValue());
    router.push(URLS.home);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Your email"
          id="email"
          action={setRegisterFormValue}
          value={email}
        />
        <InputComponent
          label="Your username"
          id="username"
          action={setRegisterFormValue}
          value={username}
        />
        <PasswordInputComponent
          id="password"
          action={setRegisterFormValue}
          value={password}
        />
        <SubmitButtonComponent title="Register" />

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
