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
import { setLoginFormValue } from "../../lib/redux/slices/loginFormSlice";
import { useState } from "react";
import Link from "next/link";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setLoginFormValue(result));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        <FormHelperText id="username-helper">
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
          Login
        </Button>
      </FormControl>

      <p>
        Are you a new user? <Link href={"/register"}>Register</Link>
      </p>
    </>
  );
};
