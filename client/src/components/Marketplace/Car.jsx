import * as React from 'react';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import StarIcon from '@mui/icons-material/Star';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {useParams, Link as RouterLink} from "react-router-dom";

import Review from '../Social/Review';
import SellingCar from '../Social/SellingCar';
import NewOffer from './NewOffer';

function MarketplaceCar() {
  const {id} = useParams();
  const cards = [1, 2, 3];
  const axis = ["Sécurité", "Budget", "Confort", "Conduite", "Equipements de série", "Qualité de la finition", "Fiabilité", "Ecologie"];

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
    <Box maxWidth="lg" container spacing={2} justifyContent="center">
    <Typography variant="h3" gutterBottom>
        Marketplace
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        <Grid item md={6} justifyContent="center">
          <Box display="flex" fullWidth justifyContent="center" sx={{mb: "30px"}}>
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
          <Box display="flex" fullWidth justifyContent="center" sx={{mt:4}}>
              <Button variant="contained" onClick={handleClickOpen} startIcon={<ShoppingCartIcon />}>Faire une offre</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}


export default MarketplaceCar;
