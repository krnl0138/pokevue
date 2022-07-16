import { FileUpload, Visibility, VisibilityOff } from "@mui/icons-material";
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
// import { writeUserData } from "../../../database";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password } = useAppSelector(
    (state) => state.profileForm
  );

  const handleChange = (e: React.SyntheticEvent) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setProfileFormValue(result));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // writeUserData(1, { username, email });
    dispatch(resetProfileFormValue());
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <p>Below you can change you data</p>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="username" margin="dense">
            Username
          </InputLabel>
          <Input
            id="username"
            aria-describedby="username-helper"
            onChange={handleChange}
            value={username}
          />
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
          <p>Upload your avatar</p>
          <FileUpload></FileUpload>
        </FormControl>

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
          Change
        </Button>
      </form>
    </div>
  );
};
