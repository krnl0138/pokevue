import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

type TInputPasswordComponent = {
  value: string;
  onChange: any;
  regex?: RegExp;
  customSX?: {};
  required?: boolean;
};
export const InputPasswordComponent = ({
  value,
  regex,
  onChange,
  customSX,
  required = false,
}: TInputPasswordComponent) => {
  // password state
  const [isFocus, setIsFocus] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const validate = (text: string) => {
    if (!regex) return false;
    return regex.test(text);
  };
  // password adornment state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <TextField
      required={required}
      error={isFocus && !isValid && true}
      type={showPassword ? "text" : "password"}
      id="password-required"
      label={isFocus ? "8+ chars" : "password"}
      onFocus={() => setIsFocus(!isFocus)}
      onBlur={() => setIsFocus(!isFocus)}
      variant="outlined"
      onChange={(e) => {
        setIsValid(validate(value));
        onChange(e);
      }}
      value={value}
      sx={{ fontWeight: 300, ...customSX }}
      InputLabelProps={{ sx: { fontWeight: "300" } }}
      InputProps={{
        endAdornment: (
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
        ),
      }}
    />
  );
};
