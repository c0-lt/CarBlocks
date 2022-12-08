import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import SendIcon from "@mui/icons-material/Send";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SellIcon from "@mui/icons-material/Sell";
import BuildIcon from "@mui/icons-material/Build";

import dayjs from "dayjs";

import {useParams} from "react-router-dom";
import MaintenanceDialog from "./MaintenanceDialog";
import SellDialog from "./SellDialog";

function Car() {
  const {id} = useParams();
  const servicing = [
    {label: "20 000 Km - Révision", description: "Révision"},
    {
      label: "40 000 Km - Contrôle technique",
      description: "Contrôle technique",
    },
    {label: "60 000 Km - Révision", description: "Révision"},
    {
      label: "80 000 Km - Contrôle technique",
      description: "Contrôle technique",
    },
  ];

  const [openSell, setOpenSell] = React.useState(false);
  const [openMaintenance, setOpenMaintenance] = React.useState(false);

  const handleOpenSell = () => {
    setOpenSell(true);
  };

  const handleCloseSell = () => {
    setOpenSell(false);
  };

  const handleOpenMaintenance = () => {
    setOpenMaintenance(true);
  };

  const handleCloseMaintenance = () => {
    setOpenMaintenance(false);
  };

  const handleSellClick = () => {
    console.log("sell");
  };

  const [activeStep, setActiveStep] = React.useState(2);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <MaintenanceDialog id={id} handleClose={handleCloseMaintenance} open={openMaintenance} car={"Mclaren 720s"}/>
      <SellDialog id={id} handleClose={handleCloseSell} open={openSell} car={"Mclaren 720s"}/>
      <Typography variant="h3" gutterBottom>
        Ma voiture {id}
      </Typography>
      <Container sx={{py: 2}} justifyContent="center">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={7} md={7}>
            <Grid container spacing={1}>
              <Grid item md={8}>
                <Typography variant="h5" gutterBottom mb={2}>
                  Détails NFT
                </Typography>
                <Typography>
                  Date de création: {dayjs().format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
                <Typography variant="h5" gutterBottom mt={2} mb={2}>
                  Caractéristiques
                </Typography>
                <Grid container spacing={1}>
                  <Grid item md={6}>
                    <Typography>Marque:</Typography>
                    <Typography>Modèle:</Typography>
                    <Typography>Energie:</Typography>
                    <Typography>Numéro d'immatriculation:</Typography>
                    <Typography>Première mise en circulation:</Typography>
                    <Typography>Numéro de série:</Typography>
                    <Typography>Kilométrage:</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography>Mclaren</Typography>
                    <Typography>720s</Typography>
                    <Typography>Essence</Typography>
                    <Typography>AF-312-RS</Typography>
                    <Typography>
                      {dayjs().format("DD-MM-YYYY HH:mm:ss")}
                    </Typography>
                    <Typography>VIN</Typography>
                    <Typography>40 000 Km</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4} pr={1}>
                <Box mb={2}>
                  <Box
                    maxWidth="100%"
                    component="img"
                    src="https://i.gaw.to/vehicles/photos/40/28/402886-2022-mclaren-720s.jpg"
                    alt="logo"
                    loading="lazy"
                  />
                </Box>
                Statut: en circulation
              </Grid>
            </Grid>
            <Box display="flex" fullWidth justifyContent="center" sx={{mt: 4}}>
              <Button
                variant="contained"
                onClick={handleOpenSell}
                startIcon={<SellIcon />}
              >
                Mettre en vente
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5} md={5} sx={{ borderLeft: 1, borderColor: 'divider' }}>
            <Typography variant="h5" gutterBottom>
              Suivi entretien
            </Typography>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              nonLinear={false}
            >
              {servicing.map((step, index) => (
                <Step key={step.label} active={index <= activeStep - 1}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Link
                      href="https://gateway.pinata.cloud/ipfs/QmedPwZBH1MfvtE25YzHPNgwxy98YMjhGKLd1DknbcToWJ/avantime_bill.pdf"
                      underline="none"
                      target="_blank"
                    >
                      <Button
                        startIcon={<RequestQuoteIcon />}
                        variant="outlined"
                        sx={{mt: 1, mr: 1}}
                      >
                        Voir facture
                      </Button>
                    </Link>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            <Box display="flex" fullWidth justifyContent="center" sx={{mt: 4}}>
              <Button
                startIcon={<BuildIcon />}
                variant="contained"
                onClick={handleOpenMaintenance}
                sx={{mt: 1, mr: 1}}
              >
                Ajouter un entretien
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Car;
