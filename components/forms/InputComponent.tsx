import { FormControl, InputLabel, FormHelperText, Input } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/dist/createAction";
import React from "react";
import { useAppDispatch } from "../../utils/hooks";

type TMyInput = {
  id: string;
  value: string;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => void | { payload: any; type: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | ActionCreatorWithPayload<any, string>;
  label: string;
  helperText?: string;
};

export const InputComponent = ({
  id,
  value,
  onChange,
  action,
  label,
  helperText,
}: TMyInput) => {
  // console.log(action);
  // console.log(onChange);
  const dispatch = useAppDispatch();
  return (
    <FormControl>
      <InputLabel htmlFor={id} margin="dense">
        {label}
      </InputLabel>
      <Input
        id={id}
        aria-describedby={`${id}-helper`}
        onChange={onChange}
        // action={action}
        // onChange={action ? action : onChange}
        value={value}
      />
      {helperText && (
        <FormHelperText id={`${id}-helper`}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
