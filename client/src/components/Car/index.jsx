import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SellIcon from "@mui/icons-material/Sell";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {Link as RouterLink} from "react-router-dom";

import dayjs from "dayjs";

import {useParams} from "react-router-dom";
import MaintenanceDialog from "./MaintenanceDialog";
import SellDialog from "./SellDialog";
import {useBackdrop} from "../../contexts/Loader";
import {useSnackbar} from "notistack";
import Pinata from "../../utils/Pinata";

function Car({contracts}) {
  const {id, energy} = useParams();
  const state = ["en circulation", "accidentée", "mise à la casse"];
  let servicing = [
    {label: "20 000 Km - Révision", description: "Révision", active: false},
    {
      label: "40 000 Km - Contrôle technique",
      description: "Contrôle technique",
      active: false,
    },
    {label: "60 000 Km - Révision", description: "Révision", active: false},
    {
      label: "80 000 Km - Contrôle technique",
      description: "Contrôle technique",
      active: false,
    },
  ];
  const maintenanceType = [
    "Révision",
    "Contrôle technique",
    "Remplacement pièces",
    "Remplacement pneus",
  ];
  const backdrop = useBackdrop();
  const {enqueueSnackbar} = useSnackbar();
  const [myCar, setMyCar] = React.useState(null);
  const [maintenances, setMaintenances] = React.useState(servicing);
  const [openSell, setOpenSell] = React.useState(false);
  const [openMaintenance, setOpenMaintenance] = React.useState(false);
  const [contract, setContract] = React.useState();

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

  const handleCancelSell = async () => {
    await contract.setPrice(id, 0);
    enqueueSnackbar(
      "Vente annulée! Veuillez rafraichir dans quelques secondes.",
      {variant: "success"}
    );
    backdrop.hideLoader();
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const initMyCar = React.useCallback(async (carBlocksContract) => {
    if (Number.isInteger(parseInt(id))) {
      let myCar = {};
      try {
        let tmpCar = await carBlocksContract.getCarblock(id);
        const tokenURI = await carBlocksContract.tokenURI(
          tmpCar.tokenId.toNumber()
        ); // TODO use tokenId
        const response = await fetch(tokenURI);
        const json = await response.json();

        let offers = [];
        offers = await carBlocksContract.getOffers(tmpCar.tokenId.toNumber());
        const hasOffer = offers.length > 0;
        myCar = {
          VIN: tmpCar.car.VIN,
          brand: tmpCar.car.brand,
          model: tmpCar.car.model,
          carState: state[tmpCar.carState],
          isForSale: tmpCar.isForSale,
          circulationStartDate: tmpCar.car.circulationStartDate.toNumber(),
          metadata: Pinata.convertCarblockFromMetadata(json),
          price: tmpCar.price.toNumber(),
          id: tmpCar.tokenId.toNumber(),
          hasOffer: hasOffer,
        };
        // TODO waiting for contract to allow setPrice 0 to cancel sell
        if (myCar.isForSale && myCar.price === 0) {
          myCar.isForSale = false;
        }

        const maintenancesFromContract =
          await carBlocksContract.getMaintenances(id);
        maintenancesFromContract.map((m, key) => {
          servicing[key] = {
            label:
              m.kilometers.toNumber() +
              " Km - " +
              dayjs.unix(m.date).format("DD-MM-YYYY"),
            description: maintenanceType[m.mType],
            active: true,
            URI: m.maintenanceURI,
          };
          setActiveStep(1);
        });
        setMaintenances(servicing);

        setMyCar(myCar);
        backdrop.hideLoader();
      } catch (e) {
        enqueueSnackbar("Vous n'êtes pas propriétaire.", {variant: "error"});
        setMyCar(null);
        backdrop.hideLoader();
      }
    } else {
      setMyCar(null);
    }
    backdrop.hideLoader();
  }, []);

  React.useEffect(() => {
    if (contracts) {
      backdrop.showLoader();
      setContract(contracts.carblocks[energy]);
    }
  }, [contracts]);

  React.useEffect(() => {
    if (contract) {
      initMyCar(contract);
    }
  }, [contract]);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Ma voiture
      </Typography>
      <Container sx={{py: 2}}>
        <Grid container spacing={4}>
          {!myCar && (
            <Grid item key={-1} xs={12} sm={12} md={12}>
              <Typography>Non autorisé</Typography>
              <br />
              <Button
                variant="contained"
                component={RouterLink}
                to="/account"
                startIcon={<DirectionsCarIcon />}
              >
                Vos voitures
              </Button>
            </Grid>
          )}
          {myCar && myCar.id && (
            <>
              <MaintenanceDialog
                id={id}
                handleClose={handleCloseMaintenance}
                open={openMaintenance}
                car={myCar}
                contract={contract}
                maintenanceType={maintenanceType}
              />
              <SellDialog
                id={id}
                handleClose={handleCloseSell}
                open={openSell}
                car={myCar}
                contract={contract}
              />
              <Grid item xs={12} sm={7} md={7}>
                <Grid container spacing={1}>
                  <Grid item md={8}>
                    {/* <Typography variant="h5" gutterBottom mb={2}>
                      Détails NFT
                    </Typography>
                    <Typography>
                      Date de création: {dayjs.unix(myCar.TODO).format("DD-MM-YYYY HH:mm:ss")}
                    </Typography> */}
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
                        <Typography>{myCar.brand}</Typography>
                        <Typography>{myCar.model}</Typography>
                        <Typography>{myCar.metadata.energy}</Typography>
                        <Typography>
                          {myCar.metadata.registrationNumber}
                        </Typography>
                        <Typography>
                          {dayjs
                            .unix(myCar.circulationStartDate)
                            .format("DD-MM-YYYY HH:mm:ss")}
                        </Typography>
                        <Typography>{myCar.VIN}</Typography>
                        <Typography>{myCar.metadata.kilometers} Km</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} pr={1}>
                    <Box mb={2}>
                      <Box
                        maxWidth="100%"
                        component="img"
                        src={myCar.metadata.image}
                        alt="logo"
                        loading="lazy"
                      />
                    </Box>
                    <Typography>Statut: {myCar.carState}</Typography>
                    {myCar.isForSale && (
                      <Typography> En vente: {myCar.price} €</Typography>
                    )}
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" sx={{mt: 4}}>
                  {!myCar.isForSale && (
                    <Button
                      variant="contained"
                      onClick={handleOpenSell}
                      startIcon={<SellIcon />}
                    >
                      Mettre en vente
                    </Button>
                  )}
                  {myCar.isForSale && (
                    <Button
                      variant="contained"
                      onClick={handleCancelSell}
                      startIcon={<SellIcon />}
                      color="error"
                    >
                      Annuler vente
                    </Button>
                  )}
                  {myCar.isForSale && myCar.hasOffer && (
                    <Button
                      size="small"
                      component={RouterLink}
                      color="secondary"
                      variant="contained"
                      startIcon={<SellIcon />}
                      to={{
                        pathname:
                          "/offer/" + myCar.metadata.energy + "/" + myCar.id,
                      }}
                      sx={{ml: 5}}
                    >
                      Suivre offre
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                md={5}
                sx={{borderLeft: 1, borderColor: "divider"}}
              >
                <Typography variant="h5" gutterBottom>
                  Suivi entretien
                </Typography>
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  nonLinear={false}
                >
                  {maintenances.map((step, index) => (
                    <Step key={step.label} active={step.active}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Link href={step.URI} underline="none" target="_blank">
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
                <Box display="flex" justifyContent="center" sx={{mt: 4}}>
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
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Car;
