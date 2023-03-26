import { Box, Grid } from "@mui/material";

type PageLayoutProps = {
  drawer: JSX.Element;
  header: JSX.Element;
  side: JSX.Element;
  main: JSX.Element;
};

const PageLayout = ({ drawer, header, side, main }: PageLayoutProps) => {
  return (
    <Box>
      <Box>{drawer}</Box>
      <Box>{header}</Box>
      <Grid container>
        <Grid
          item
          sx={{ background: "#333", display: { xs: "none", lg: "block" } }}
          lg={4}
        >
          {side}
        </Grid>
        <Grid sx={{ background: "#242424" }} item xs={12} lg={8}>
          {main}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageLayout;
