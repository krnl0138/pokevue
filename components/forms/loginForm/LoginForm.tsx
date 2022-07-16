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
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  resetLoginFormValue,
  setLoginFormValue,
} from "../../../lib/redux/slices/loginFormSlice";
import React, { useState } from "react";
import Link from "next/link";
import { PROJECT_URLS as urls } from "../../../utils/constants";
import { setUser } from "../../../lib/redux/slices/userSlice";
import users from "../../../public/fakeUsers.json";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = useAppSelector((state) => state.loginForm);

  const handleChange = (e: React.SyntheticEvent) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    console.log("result value from handleChange: ", result);
    dispatch(setLoginFormValue(result));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetLoginFormValue());
    // TODO fake auth delete
    dispatch(setUser(users.users[0]));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
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
          <FormHelperText id="username-helper">
            We&apos;ll never share your email.
          </FormHelperText>
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

        <FormControl>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Login
          </Button>
        </FormControl>
      </form>

      <p>
        Are you a new user? <Link href={urls.register}>Register</Link>
      </p>
    </div>
  );
};
