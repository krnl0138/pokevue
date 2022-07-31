import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type TInputComponent = {
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  regex?: RegExp;
  customSX?: {};
  defaultValue?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  helperText?: string;
};
export const InputComponent = ({
  value,
  regex,
  label,
  onChange,
  customSX,
  defaultValue,
  size = "medium",
  required = false,
  fullWidth = false,
  helperText,
}: TInputComponent) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const validate = (text: string) => {
    if (!regex) return true;
    return regex.test(text);
  };

  return (
    <TextField
      required={required}
      size={size}
      fullWidth={fullWidth}
      error={isFocus && !isValid && true}
      onFocus={() => setIsFocus(!isFocus)}
      onBlur={() => setIsFocus(!isFocus)}
      id={`${value}-required`}
      label={isFocus ? helperText : label}
      variant="outlined"
      defaultValue={defaultValue}
      onChange={(e) => {
        setIsValid(regex ? validate(value) : true);
        onChange(e);
      }}
      value={value}
      sx={{ fontWeight: "300", ...customSX }}
      InputLabelProps={{ sx: { fontWeight: "300" } }}
    />
  );
};
