import { useContext, useState } from "react";

import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { AppContext } from "../../context/AppContext";
import Clickable from "../Clickable/Clickable";
import CartModal from "./CartModal";

const CartIcon = () => {
  const { cart } = useContext(AppContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Clickable onClick={() => setShowModal(true)}>
        <Badge badgeContent={cart.length} color="primary">
          <ShoppingCartIcon sx={{ fontSize: "2.5rem", color: "white" }} />
        </Badge>
      </Clickable>
      <CartModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default CartIcon;
