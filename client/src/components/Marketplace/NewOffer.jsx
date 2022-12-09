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

function NewOffer({id, handleClose, open, car}) {
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
        <DialogTitle>Faire une offre</DialogTitle>
        <DialogContent>
          <DialogContentText>{car}</DialogContentText>
          <Grid container spacing={2} sx={{mt: 2}} justifyContent="center">
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                required
                label="Offre"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ETH</InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
            Envoyer offre
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default NewOffer;
