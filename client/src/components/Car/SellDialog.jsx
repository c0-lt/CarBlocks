import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

import {useBackdrop} from "../../contexts/Loader";
import {useSnackbar} from "notistack";
import {useAccount} from "wagmi";
import {useNavigate} from "react-router-dom";
import Pinata from "../../utils/Pinata";

function SellDialog({handleClose, open, car, contract}) {
  const navigate = useNavigate();
  const backdrop = useBackdrop();
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    backdrop.showLoader();
    const data = new FormData(event.currentTarget);
    const price = parseInt(data.get("price"));
    if(Number.isInteger(price) && price>0) {
      try {
        await contract.setPrice(car.id,price);
        enqueueSnackbar("CarBlock mis en vente! Veuillez rafraichir dans quelques secondes.", {variant: "success"});
        backdrop.hideLoader();
        handleClose();
      } catch (e) {
        console.error(e);
        enqueueSnackbar("Erreur lors de la transaction", {variant: "error"});
        backdrop.hideLoader();
        handleClose();
      }
    } else {
      enqueueSnackbar("Le prix n'est pas un nombre entier ou égal à 0.", {variant: "error"});
      backdrop.hideLoader();
    }
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
          <DialogContentText>{car.brand} {car.model}</DialogContentText>
          <Grid container spacing={2} sx={{mt: 2}} justifyContent="center">
            <Grid item xs={6}>
              <TextField
                id="price"
                name="price"
                required
                label="Prix"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              ></TextField>
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
