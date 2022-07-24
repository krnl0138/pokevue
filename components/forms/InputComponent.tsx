import { FormControl, InputLabel, FormHelperText, Input } from "@mui/material";
import React from "react";

type TMyInput = {
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | { payload: any; type: string };
  label: string;
  helperText?: string;
};

export const InputComponent = ({
  id,
  value,
  onChange,
  label,
  helperText,
}: TMyInput) => {
  return (
    <FormControl>
      <InputLabel htmlFor={id} margin="dense">
        {label}
      </InputLabel>
      <Input
        id={id}
        aria-describedby={`${id}-helper`}
        onChange={onChange}
        value={value}
      />
      {helperText && (
        <FormHelperText id={`${id}-helper`}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
