import { FormControl, InputLabel, FormHelperText, Input } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../utils/hooks";

type TInputWrapper = {
  id: string;
  value: string;
  action: ActionCreatorWithPayload<any, string>;
  label: string;
  helperText?: string;
};

export const InputWrapper = ({
  id,
  value,
  action,
  label,
  helperText,
}: TInputWrapper) => {
  const dispatch = useAppDispatch();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    console.log("result is: ", result);
    dispatch(action(result));
  };
  return (
    <FormControl>
      <InputLabel htmlFor={id} margin="dense">
        {label}
      </InputLabel>
      <Input
        id={id}
        aria-describedby={`${id}-helper`}
        onChange={handleOnChange}
        value={value}
      />
      {helperText && (
        <FormHelperText id={`${id}-helper`}>
          We&apos;ll never share your email.
        </FormHelperText>
      )}
    </FormControl>
  );
};
