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
import AddCommentIcon from '@mui/icons-material/AddComment';

import {useParams, Link as RouterLink} from "react-router-dom";

import Review from './Review';
import SellingCar from './SellingCar';
import NewReview from './NewReview';

function SocialCar() {
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
    <NewReview id={id} handleClose={handleClose} open={open} car={"Mclaren 720s"}/>
    <Box maxWidth="lg" container spacing={2}>
      <Paper
        sx={{
          minHeight: "200px",
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url("https://gateway.pinata.cloud/ipfs/QmdDdTf4YgDFFsKr6VJGjV8hzcPqBfre7DYNdHDXLm43aG")`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{display: "none"}}
            src="https://gateway.pinata.cloud/ipfs/QmdDdTf4YgDFFsKr6VJGjV8hzcPqBfre7DYNdHDXLm43aG"
            alt="Mclaren 720s"
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: {xs: 3, md: 6},
                pr: {md: 0},
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Mclaren 720s
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                component="h3"
                variant="h4"
                color="inherit"
                gutterBottom
              >
                Avis
              </Typography>
              <Button variant="contained" onClick={handleClickOpen} startIcon={<AddCommentIcon />}>Ajouter un avis</Button>
            </Box>
          </Box>
          <Grid container spacing={2} sx={{mt: 2, p: 1, border: 1, borderColor: 'divider'}}>
              {/* @TODO MAP */}
              <Review axis={axis}/>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Box>
            <Typography
              component="h3"
              variant="h4"
              color="inherit"
              gutterBottom
            >
              Véhicules en vente
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <SellingCar car={card}/>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default SocialCar;
