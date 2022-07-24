import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";

type TPasswordWrapper = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInputComponent = ({
  id,
  value,
  onChange,
}: TPasswordWrapper) => {
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
        // onChange={handleOnChange}
        onChange={onChange}
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
