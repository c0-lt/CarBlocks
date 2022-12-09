import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {useParams} from "react-router-dom";

import NewOffer from './NewOffer';

function MarketplaceCar() {
  const {id} = useParams();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <NewOffer id={id} handleClose={handleClose} open={open} car={"Mclaren 720s"}/>
    <Box maxWidth="lg" justifyContent="center">
    <Typography variant="h3" gutterBottom>
        Marketplace
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        <Grid item md={6} justifyContent="center">
          <Box display="flex" justifyContent="center" sx={{mb: "30px"}}>
          <Box
            maxWidth="sm"
            component="img"
            src="https://gateway.pinata.cloud/ipfs/QmdDdTf4YgDFFsKr6VJGjV8hzcPqBfre7DYNdHDXLm43aG"
            alt="logo"
          />
          </Box>
        </Grid>
        <Grid item md={6} justifyContent="center">
          <Grid container sx={{ p: 4, border: 1, borderColor: 'divider'}}>
          <Grid item md={12}>
            <Typography
                component="h3"
                variant="h4"
                color="inherit"
                gutterBottom
              >
                Mclaren 720s
              </Typography>
              <Typography>
                      2022 | 12 256 kms
                    </Typography>
                    </Grid>
                    </Grid>
          <Box display="flex" justifyContent="center" sx={{mt:4}}>
              <Button variant="contained" onClick={handleClickOpen} startIcon={<ShoppingCartIcon />}>Faire une offre</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}


export default MarketplaceCar;
