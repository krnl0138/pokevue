import { Send } from "@mui/icons-material";
import { FormControl, Button } from "@mui/material";

export const SubmitButtonWrapper = ({ title }: { title: string }) => {
  return (
    <FormControl>
      <Button type="submit" variant="contained" endIcon={<Send />}>
        {title}
      </Button>
    </FormControl>
  );
};
