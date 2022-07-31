import { FormControl, Button } from "@mui/material";

export const SubmitButtonComponent = ({
  text,
  icon,
}: {
  text?: string;
  icon?: JSX.Element;
}) => {
  return (
    <FormControl>
      <Button type="submit" variant="outlined" endIcon={icon}>
        {text}
      </Button>
    </FormControl>
  );
};
