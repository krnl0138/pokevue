import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useState } from "react";
import {
  resetProfileFormValue,
  setProfileFormValue,
} from "../../../lib/redux/slices/profileFormSlice";
import {
  dbGetUser,
  handleUpdateEmail,
  handleUpdatePassword,
  dbUpdateUserData,
} from "../../../database";
import { InputWrapper } from "../InputWrapper";
import { PasswordInputWrapper } from "../PasswordInputWrapper";
import { SubmitButtonWrapper } from "../SubmitButtonWrapper";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const [isChanged, setIsChanged] = useState(false);

  const { username, email, password, avatar } = useAppSelector(
    (state) => state.profileForm
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username && !email && !avatar && !password) return;
    email && handleUpdateEmail(email);
    password && handleUpdatePassword(password);
    await dbUpdateUserData({
      username,
      email,
      avatar,
    });
    await dbGetUser();
    setIsChanged(true);
    dispatch(resetProfileFormValue());
  };

  return (
    <div>
      <p>Below you can change you data</p>
      {isChanged && <p>Data was successfully changed!</p>}
      <form onSubmit={handleSubmit}>
        <InputWrapper
          label="Your email"
          id="email"
          action={setProfileFormValue}
          value={email}
        />
        <InputWrapper
          label="Your username"
          id="username"
          action={setProfileFormValue}
          value={username}
        />
        <InputWrapper
          label="Your avatar url"
          id="avatar"
          action={setProfileFormValue}
          value={avatar}
        />
        <PasswordInputWrapper
          id="password"
          action={setProfileFormValue}
          value={password}
        />
        <SubmitButtonWrapper title="Submit" />
      </form>
    </div>
  );
};
