import { Box } from "@mui/material";

type ClickableProps = {
  children: JSX.Element;
  onClick: () => void;
};

const Clickable = ({ children, onClick }: ClickableProps) => {
  return (
    <Box sx={{ cursor: "pointer" }} onClick={onClick}>
      {children}
    </Box>
  );
};

export default Clickable;
