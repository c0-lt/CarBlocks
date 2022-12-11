import Cars from "./Cars";
import Filters from "./Filters";
import Grid from '@mui/material/Grid';

function Marketplace({contracts}) {
  return (
    <Grid maxWidth="lg" container spacing={2}>
      <Grid item md={3}>
        <Filters/>
      </Grid>
      <Grid item md={9}>
        <Cars contracts={contracts}/>
      </Grid>
    </Grid>
  );
}

export default Marketplace;
