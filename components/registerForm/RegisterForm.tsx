import { Send, Visibility, VisibilityOff } from "@mui/icons-material";
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
import { useAppDispatch } from "../../utils/hooks";
import { useState } from "react";
import { setRegisterFormValue } from "../../lib/redux/slices/registerFormSlice";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../database";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setRegisterFormValue(result));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // firebase test functionality
  const auth = getAuth(app);
  const handleGoogleAuth = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="username" margin="dense">
          Username
        </InputLabel>
        <Input
          id="username"
          aria-describedby="username-helper"
          onChange={handleChange}
        />

        <InputLabel htmlFor="email" margin="dense">
          Email
        </InputLabel>
        <Input
          id="email"
          aria-describedby="email-helper"
          onChange={handleChange}
        />
        <FormHelperText id="email-helper">
          We'll never share your email.
        </FormHelperText>

        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
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

        <Button type="submit" variant="contained" endIcon={<Send />}>
          Register
        </Button>
      </FormControl>

      <Button
        onClick={handleGoogleAuth}
        type="button"
        variant="contained"
        endIcon={<Send />}
      >
        Register with Google account
      </Button>
    </>
  );
};
