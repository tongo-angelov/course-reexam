import { useContext, useMemo } from "react";

import { Box, Grid, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { AppContext } from "../../context/AppContext";
import CartModalItem from "./CartModalItem";
import Clickable from "../Clickable/Clickable";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cart, allProducts } = useContext(AppContext);

  const products = useMemo(() => {
    return allProducts.filter((product) => cart.includes(product._id));
  }, [cart]);

  const getCount = (id: string) => {
    return cart.filter((item) => item === id).length;
  };

  const totalPrice = useMemo(() => {
    if (!cart.length || !products.length) return 0;
    return products
      .map((item) => getCount(item._id) * item.price)
      .reduce((a, b) => a + b);
  }, [cart, products]);

  const totalDiscount = useMemo(() => {
    if (!products.length) return 0;
    const data = products
      .filter((item) => item.discount)
      .map((item) => getCount(item._id) * (item.price - item.discount!));
    if (!data.length) return 0;
    return data.reduce((a, b) => a + b);
  }, [cart, products]);

  const finalPrice = useMemo(() => {
    return totalPrice - totalDiscount;
  }, [totalPrice, totalDiscount]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
        }}
      >
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              background: "#555",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4">My Cart ({cart.length})</Typography>
              <Clickable onClick={onClose}>
                <CloseIcon sx={{ fontSize: "2.5rem", color: "white" }} />
              </Clickable>
            </Box>
            <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
              {products.map((product) => (
                <CartModalItem key={product._id} product={product} />
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              {!!totalDiscount && (
                <>
                  <Typography
                    variant="caption"
                    sx={{ textDecoration: "line-through" }}
                  >
                    Price: ${totalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="h6" color="#42f44d">
                    Discount: ${totalDiscount.toFixed(2)}
                  </Typography>
                </>
              )}
              <Typography variant="h5">
                Total price: ${finalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CartModal;
