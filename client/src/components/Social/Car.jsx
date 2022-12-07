import Cars from "./Cars";
import Filters from "./Filters";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import {useParams} from "react-router-dom";

function SocialCar() {
  const {id} = useParams();

  return (
    <Box maxWidth="lg" container spacing={2}>
      SocialCar
    </Box>
  );
}

export default SocialCar;
