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
import { useAppDispatch } from "../../../utils/hooks";
import { useState } from "react";
import { setRegisterFormValue } from "../../../lib/redux/slices/registerFormSlice";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setRegisterFormValue(result));
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

        <InputLabel htmlFor="email" margin="dense">
          Email
        </InputLabel>
        <Input
          id="email"
          aria-describedby="email-helper"
          onChange={handleChange}
        />
        <FormHelperText id="email-helper">
          We&apos;ll never share your email.
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
    </>
  );
};
