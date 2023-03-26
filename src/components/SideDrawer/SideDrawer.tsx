import { Box, Drawer } from "@mui/material";
import FilterCard from "../FilterCard/FilterCard";

type SideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  return (
    <Drawer anchor={"left"} open={isOpen} onClose={onClose}>
      <Box sx={{ background: "#242424", flex: "1", width: "400px" }}>
        <FilterCard />
      </Box>
    </Drawer>
  );
};
export default SideDrawer;
