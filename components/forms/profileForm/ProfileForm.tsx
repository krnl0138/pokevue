import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
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
import { setUser } from "../../../lib/redux/slices/userSlice";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const { username, email, password, avatar } = useAppSelector(
    (state) => state.profileForm
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setProfileFormValue(result));
  };

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
    const user = await dbGetUser();
    dispatch(setUser(user));
    setIsChanged(true);
    dispatch(resetProfileFormValue());
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <p>Below you can change you data</p>
      {isChanged && <p>Data was successfully changed</p>}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="username" margin="dense">
            Username
          </InputLabel>
          <Input id="username" onChange={handleChange} value={username} />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="email" margin="dense">
            Email
          </InputLabel>
          <Input
            id="email"
            aria-describedby="email-helper"
            onChange={handleChange}
            value={email}
          />
          <FormHelperText id="email-helper">
            We&apos;ll never share your email.
          </FormHelperText>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="avatar" margin="dense">
            Url image
          </InputLabel>
          {/* <Input id="file" type="file" value={file} onChange={handleChange} /> */}
          <Input id="avatar" value={avatar} onChange={handleChange} />
        </FormControl>

        {/* // TODO should be 2 passwords input: 1st to check 2nd to change */}
        <FormControl>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};
