import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

enum FilterBy {
  brand,
  type,
  discount,
}

const FilterCard = () => {
  const { filterProducts, brands, types } = useContext(AppContext);

  const [brand, setBrand] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [discounted, setDiscounted] = useState<boolean | null>(null);

  useEffect(() => {
    filterProducts({
      brand,
      type,
      discounted,
    });
  }, [brand, type, discounted]);

  const clearFilter = () => {
    setBrand("");
    setType("");
    setDiscounted(null);
  };

  const updateFilter = (filter: FilterBy, value: string | null) => {
    switch (filter) {
      case FilterBy.brand:
        setBrand(value ?? "");
        break;
      case FilterBy.type:
        setType(value ?? "");
        break;
      case FilterBy.discount:
        setDiscounted(value === "true");
        break;
    }
  };

  return (
    <Box sx={{ paddingTop: "20px", color: "white" }}>
      <Typography variant="h4" textAlign="center">
        Filters
      </Typography>
      <Box sx={{ padding: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            value={type}
            label="Type"
            onChange={(e) => updateFilter(FilterBy.type, e.target.value)}
          >
            {types.map((b) => (
              <MenuItem key={b} value={b}>
                <ListItemText primary={b} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ padding: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="brand">Brand</InputLabel>
          <Select
            labelId="brand"
            value={brand}
            label="Brand"
            onChange={(e) => updateFilter(FilterBy.brand, e.target.value)}
          >
            {brands.map((b) => (
              <MenuItem key={b} value={b}>
                <ListItemText primary={b} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={!!discounted}
            onChange={(e) =>
              updateFilter(FilterBy.discount, String(e.target.checked))
            }
          />
          <Typography>Discounted</Typography>
        </Box>
      </Box>
      <Button fullWidth onClick={clearFilter}>
        Clear filters
      </Button>
    </Box>
  );
};

export default FilterCard;
