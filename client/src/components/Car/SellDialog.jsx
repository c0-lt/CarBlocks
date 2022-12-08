import * as React from "react";
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
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import StarIcon from "@mui/icons-material/Star";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddCommentIcon from "@mui/icons-material/AddComment";

import {useParams, Link as RouterLink} from "react-router-dom";

function SellDialog({id, handleClose, open, car}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        noValidate
        onSubmit={handleSubmit}
        sx={{mt: 3, mx: "auto"}}
        maxWidth="sm"
      >
        <DialogTitle>Mettre en vente</DialogTitle>
        <DialogContent>
          <DialogContentText>{car}</DialogContentText>
          <Grid container spacing={2} sx={{mt: 2}} justifyContent="center">
            <Grid item xs={6} >
            <TextField
              id="price"
              required
              label="Prix"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    ETH
                  </InputAdornment>
                ),
              }}
            >
            </TextField>
            </Grid>
            
          </Grid>
          <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
            Mettre en vente
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default SellDialog;
