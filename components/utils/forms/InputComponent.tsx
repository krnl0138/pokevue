import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute, useState } from "react";
import { TMyChangeFormEvent } from "../../../utils/types";

type TInputComponent = {
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange: (e: TMyChangeFormEvent) => void;
  label: string;
  regex?: RegExp;
  customSX?: {};
  defaultValue?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  labelFocus?: string;
  helperText?: string;
};
export const InputComponent = ({
  required = false,
  type = "text",
  value,
  regex,
  label,
  onChange,
  customSX,
  defaultValue,
  size = "medium",
  fullWidth = false,
  labelFocus,
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
      type={type}
      required={required}
      size={size}
      fullWidth={fullWidth}
      error={isFocus && !isValid && true}
      onFocus={() => setIsFocus(!isFocus)}
      onBlur={() => setIsFocus(!isFocus)}
      label={isFocus ? labelFocus : label}
      helperText={helperText && helperText}
      variant="outlined"
      defaultValue={defaultValue}
      onChange={(e) => {
        setIsValid(regex && value ? validate(value) : true);
        onChange(e);
      }}
      value={value}
      sx={{ fontWeight: "300", ...customSX }}
      InputLabelProps={{ sx: { fontWeight: "300" } }}
    />
  );
};
