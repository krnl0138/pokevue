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
import { getUser, hanldeSignInWithEmailPassword } from "../../../database";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = useAppSelector((state) => state.loginForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setLoginFormValue(result));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // sign in with firebase/auth
    const signIn = await hanldeSignInWithEmailPassword(email, password);
    // pull data by returned uid from firebase/database
    const user = await getUser(signIn.user.uid);
    // populate returned data as redux user slice
    dispatch(setUser(user));
    dispatch(resetLoginFormValue());
    router.push(urls.main);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="email" margin="dense">
            email
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
