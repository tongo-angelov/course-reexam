import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import { Product } from "../../context/types";

type ProductsListItemProps = {
  product: Product;
};
const ProductsListItem = ({ product }: ProductsListItemProps) => {
  const { addToCart } = useContext(AppContext);

  const rate = product.discount;

  return (
    <Box
      sx={{
        background: "#444",
        margin: "10px",
        padding: "5px",
        height: "20svh",
        boxShadow: "2px 2px 4px black",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="caption">{product.type}</Typography>

      <Typography variant="h6">
        {product.brand} {product.model}
      </Typography>

      {product.discount && (
        <>
          <Typography
            variant="caption"
            sx={{ textDecoration: "line-through" }}
            color="#f44242"
          >
            ${product.price}
          </Typography>
          <Typography variant="caption"> -{rate}%</Typography>
        </>
      )}

      <Typography variant="h5">${product.discount ?? product.price}</Typography>

      <Button onClick={() => addToCart(product._id)}>Add to cart</Button>
    </Box>
  );
};

export default ProductsListItem;
