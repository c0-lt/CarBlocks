import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import StarIcon from "@mui/icons-material/Star";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

import {useBackdrop} from "../../contexts/Loader";
import {useSnackbar} from "notistack";
import {useAccount} from "wagmi";
import {useNavigate} from "react-router-dom";

function NewReview({id, handleClose, open, car, contract}) {
  const [valueSecurity, setValueSecurity] = React.useState(0);
  const [valueBudget, setValueBudget] = React.useState(0);
  const [valueComfort, setValueComfort] = React.useState(0);
  const [valueDriving, setValueDriving] = React.useState(0);
  const [valueEquipment, setValueEquipment] = React.useState(0);
  const [valueQuality, setValueQuality] = React.useState(0);
  const [valueReliability, setValueReliability] = React.useState(0);
  const [valueEcology, setValueEcology] = React.useState(0);
  const navigate = useNavigate();
  const backdrop = useBackdrop();
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    backdrop.showLoader();
    const data = new FormData(event.currentTarget);
    console.log({
      pros: data.get("pros").replaceAll("\n", "|"),
      cons: data.get("cons").replaceAll("\n", "|"),
      comment: data.get("comment"),
    });

    try {
      await contract.createOpinion(
        car.card.cardId.toNumber(),
        data.get("comment"),
        data.get("pros").replaceAll("\n", "|"),
        data.get("cons").replaceAll("\n", "|"),
        [
          valueSecurity * 10,
          valueBudget * 10,
          valueComfort * 10,
          valueDriving * 10,
          valueEquipment * 10,
          valueQuality*10,
          valueReliability*10,
          valueEcology*10
        ]
      );
      enqueueSnackbar(
        "Avis ajouté! Veuillez rafraichir dans quelques secondes.",
        {variant: "success"}
      );
      backdrop.hideLoader();
      handleClose();
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Erreur lors de la transaction", {variant: "error"});
      backdrop.hideLoader();
      handleClose();
    }
    backdrop.hideLoader();
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
        <DialogTitle>Ajout d'avis</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {car.card.brand} {car.card.model}
          </DialogContentText>
          <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={12}>
              <TextField
                name="pros"
                required
                fullWidth
                multiline
                maxRows={4}
                id="pros"
                label="Avantages"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddBoxOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cons"
                required
                fullWidth
                multiline
                maxRows={4}
                id="cons"
                label="Inconvénients"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IndeterminateCheckBoxOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Sécurité</Grid>
                <Grid item>
                  <Rating
                    name="rating-security"
                    value={valueSecurity}
                    onChange={(event, newValue) => {
                      setValueSecurity(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Budget</Grid>
                <Grid item>
                  <Rating
                    name="rating-budget"
                    value={valueBudget}
                    onChange={(event, newValue) => {
                      setValueBudget(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Confort</Grid>
                <Grid item>
                  <Rating
                    name="rating-comfort"
                    value={valueComfort}
                    onChange={(event, newValue) => {
                      setValueComfort(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Conduite</Grid>
                <Grid item>
                  <Rating
                    name="rating-driving"
                    value={valueDriving}
                    onChange={(event, newValue) => {
                      setValueDriving(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Equipement de série</Grid>
                <Grid item>
                  <Rating
                    name="rating-equipment"
                    value={valueEquipment}
                    onChange={(event, newValue) => {
                      setValueEquipment(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Qualité</Grid>
                <Grid item>
                  <Rating
                    name="rating-quality"
                    value={valueQuality}
                    onChange={(event, newValue) => {
                      setValueQuality(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Fiabilité</Grid>
                <Grid item>
                  <Rating
                    name="rating-reliability"
                    value={valueReliability}
                    onChange={(event, newValue) => {
                      setValueReliability(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" spacing="6">
                <Grid item>Ecologie</Grid>
                <Grid item>
                  <Rating
                    name="rating-ecology"
                    value={valueEcology}
                    onChange={(event, newValue) => {
                      setValueEcology(newValue);
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{opacity: 0.55}} fontSize="inherit" />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="comment"
                fullWidth
                multiline
                maxRows={4}
                id="comment"
                label="Commentaire"
                /* InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddCommentIcon />
                    </InputAdornment>
                  ),
                }} */
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
            Enregistrer
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default NewReview;
