import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ProductsListItem from "./ProductsListItem";

const ProductsList = () => {
  const { allProducts } = useContext(AppContext);

  if (!allProducts.length)
    return (
      <Container>
        <Typography color="white" variant="h2" textAlign="center">
          No Products Found
        </Typography>
      </Container>
    );

  return (
    <Grid container sx={{ background: "#242424" }}>
      {allProducts.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={6}>
          <ProductsListItem product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
