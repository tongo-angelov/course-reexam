import { useContext, useMemo } from "react";

import { Box, Grid, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { AppContext } from "../../context/AppContext";
import { Product } from "../../context/types";
import Clickable from "../Clickable/Clickable";

type CartModalItemProps = {
  product: Product;
};

const CartModalItem = ({ product }: CartModalItemProps) => {
  const { cart, addToCart, removeFromCart, purgeFromCart } =
    useContext(AppContext);

  const count = useMemo(() => {
    return cart.filter((item) => item === product._id).length;
  }, [cart]);

  const total = useMemo(() => {
    return count * (product.discount ?? product.price);
  }, [count]);

  return (
    <Box
      sx={{
        background: "#444",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "5px",
        marginBottom: "5px",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={4}>
          <Typography variant="h6">
            {product.brand} {product.model}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent="center">
            <Grid item>
              <Grid container flexDirection="column" alignItems="center">
                <Grid item>
                  <Clickable onClick={() => addToCart(product._id)}>
                    <AddCircleOutlineIcon />
                  </Clickable>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{count}x</Typography>
                </Grid>
                <Grid item>
                  <Clickable onClick={() => removeFromCart(product._id)}>
                    <RemoveCircleOutlineIcon />
                  </Clickable>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ display: "flex", paddingLeft: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5">
                  ${product.discount?.toFixed(2) ?? product.price.toFixed(2)}
                </Typography>
                {product.discount && (
                  <Grid item>
                    <Typography
                      variant="caption"
                      sx={{ textDecoration: "line-through" }}
                    >
                      (${product.price.toFixed(2)})
                    </Typography>
                  </Grid>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} justifyContent="center">
          <Typography variant="h5">${total.toFixed(2)}</Typography>
        </Grid>
        <Grid item>
          <Clickable onClick={() => purgeFromCart(product._id)}>
            <DeleteForeverIcon sx={{ fontSize: "2.5rem", color: "white" }} />
          </Clickable>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartModalItem;
