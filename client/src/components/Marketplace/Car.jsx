import Cars from "./Cars";
import Filters from "./Filters";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import {useParams} from "react-router-dom";

function MarketplaceCar() {
  const {id} = useParams();

  return (
    <Box maxWidth="lg">
      MarketplaceCar
    </Box>
  );
}

export default MarketplaceCar;
