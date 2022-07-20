import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";
import { useAppDispatch } from "../../utils/hooks";

type TPasswordWrapper = {
  id: string;
  value: string;
  action: ActionCreatorWithPayload<any, string>;
};
export const PasswordInputWrapper = ({
  id,
  value,
  action,
}: TPasswordWrapper) => {
  const dispatch = useAppDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(action(result));
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <FormControl>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        onChange={handleOnChange}
        value={value}
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
  );
};
