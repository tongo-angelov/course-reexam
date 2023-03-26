import { Box } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Clickable from "../Clickable/Clickable";
import CartIcon from "../Cart/CartIcon";

type HeaderProps = {
  toggleDrawer: () => void;
};

const Header = ({ toggleDrawer }: HeaderProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#444",
        padding: "20px",
        display: "flex",
        justifyContent: {
          xs: "space-between",
          lg: "end",
        },
      }}
    >
      <Box sx={{ display: { md: "block", lg: "none" } }}>
        <Clickable onClick={toggleDrawer}>
          <MenuIcon sx={{ fontSize: "2.5rem", color: "white" }} />
        </Clickable>
      </Box>

      <CartIcon />
    </Box>
  );
};

export default Header;
