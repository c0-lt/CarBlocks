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
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";

import {useParams} from "react-router-dom";
import {useBackdrop} from "../../contexts/Loader";
import {useSnackbar} from "notistack";
import {useAccount} from "wagmi";
import {useNavigate} from "react-router-dom";
import Pinata from "../../utils/Pinata";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import dayjs from "dayjs";
import {Link as RouterLink} from "react-router-dom";

function Offer({contracts}) {
  const {id, energy} = useParams();
  const navigate = useNavigate();
  const backdrop = useBackdrop();
  const {enqueueSnackbar} = useSnackbar();
  const [marketplaceCar, setMarketplaceCar] = React.useState();
  const [contract, setContract] = React.useState();
  const {address, isConnected} = useAccount();

  const handleCancel = () => {
    backdrop.showLoader();
    enqueueSnackbar("Annulation en cours de construction.", {variant: "info"});
    backdrop.hideLoader();
  };

  const handleAccept = () => {
    backdrop.showLoader();
    enqueueSnackbar("Accepter offre en cours de construction.", {variant: "info"});
    backdrop.hideLoader();
  };

  const handleReject = () => {
    backdrop.showLoader();
    enqueueSnackbar("Rejeter offre en cours de construction.", {variant: "info"});
    backdrop.hideLoader();
  };

  const getOffer = (offer) => {
    console.log("offre");
    console.log(offer);
    if (offer) {
      return {
        price: offer.price.toNumber(),
        user: offer.user,
        recipient: offer.recipient,
      };
    } else {
      return {price: 0, user: "", recipient: ""};
    }
  };

  const initCars = React.useCallback(
    async (contracts) => {
      console.log("Init marketplace cars");
      console.log(contracts);
      let myCars = {};
      const carBlocksContract = contracts.carblocks[energy];
      myCars = {};
      let tmpCars = await carBlocksContract.getCarblocksForSale();
      for (let h in tmpCars) {
        let tmpCar = tmpCars[h];
        console.log(tmpCar);
        // console.log((parseInt(h)+1));
        // console.log(json.image);
        if (tmpCar.isForSale && tmpCar.tokenId == id) {
          // TODO waiting for Quentin to solve issue on getCarblocksForSale
          const tokenURI = await carBlocksContract.tokenURI(
            tmpCar.tokenId.toNumber()
          );
          console.log(tokenURI);
          const owner = await carBlocksContract.ownerOf(
            tmpCar.tokenId.toNumber()
          );
          console.log(owner);
          const hasMadeOffer = await carBlocksContract.hasMadeOffer(
            tmpCar.tokenId.toNumber()
          );
          let offers = [];
          let offer = {price: 0, user: "", recipient: ""};
          const isOwner = address == owner;
          if (isOwner) {
            offers = await carBlocksContract.getOffers(
              tmpCar.tokenId.toNumber()
            );
            console.log(offers);
            // TODO Improve, retrieves only the first offer
            offer = getOffer(offers[0]);
          }
          if (hasMadeOffer) {
            // TODO
            // offer = getOffer(await carBlocksContract.getOffer(tmpCar.tokenId.toNumber()));
          }
          const response = await fetch(tokenURI);
          const json = await response.json();
          myCars[tmpCar.tokenId.toNumber()] = {
            brand: tmpCar.car.brand,
            model: tmpCar.car.model,
            price: tmpCar.price.toNumber(),
            isForSale: tmpCar.isForSale,
            energy: energy,
            circulationStartDate: tmpCar.car.circulationStartDate.toNumber(),
            metadata: Pinata.convertCarblockFromMetadata(json),
            tokenId: tmpCar.tokenId.toNumber(),
            owner: owner,
            hasMadeOffer: hasMadeOffer,
            offers: offers,
            offer: offer,
            isOwner: isOwner,
          };
          break;
        }
      }
      console.log(myCars);
      // setCars(myCars);
      const myCar = myCars[id];
      setMarketplaceCar(myCar);
      setContract(contracts.carblocks[energy]);
      console.log(contracts.carblocks[energy]);
      console.log(myCar);
      console.log(myCar.offer);
      backdrop.hideLoader();
    },
    [contracts]
  );

  React.useEffect(() => {
    if (contracts) {
      backdrop.showLoader();
      // setContract(contracts.carblocks[energy]);
      initCars(contracts);
    }
  }, [contracts]);

  return (
    <Box>
      {(!marketplaceCar || marketplaceCar.hasMadeOffer) && (
      <Typography variant="h3" gutterBottom>
        Mon offre
      </Typography>
      )}
      {marketplaceCar && marketplaceCar.isOwner && (
      <Typography variant="h3" gutterBottom>
        Ma vente
      </Typography>
      )}
      <Container sx={{py: 2}} maxWidth="md">
        <Grid container spacing={4}>
          {!marketplaceCar && (
            <Grid item key={-1} xs={12} sm={12} md={12}>
              <Typography>Non autorisé</Typography>
              <br />
              <Button
                variant="contained"
                component={RouterLink}
                to="/marketplace"
                startIcon={<ShoppingCartIcon />}
              >
                Marketplace
              </Button>
            </Grid>
          )}
          {marketplaceCar &&
            (marketplaceCar.hasMadeOffer || marketplaceCar.isOwner) && (
              <>
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={marketplaceCar.metadata.image}
                      alt="random"
                    />
                    <CardContent sx={{flexGrow: 1}}>
                      <Typography
                        component="h2"
                        variant="h4"
                        color="text.primary"
                      >
                        {marketplaceCar.offer.price} €
                      </Typography>
                      <Typography sx={{mb: 1.5}} color="text.secondary">
                        Offre
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        {marketplaceCar.brand} {marketplaceCar.model}
                      </Typography>
                      <Typography>
                        {dayjs
                          .unix(marketplaceCar.circulationStartDate)
                          .format("YYYY")}{" "}
                        | {marketplaceCar.metadata.kilometers} Kms
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {marketplaceCar.hasMadeOffer && (
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={handleCancel}
                        >
                          Annuler offre
                        </Button>
                      )}
                      {marketplaceCar.isOwner && (
                        <>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={handleAccept}
                          >
                            Accepter
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={handleReject}
                          >
                            Refuser
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <List
                    sx={{
                      height: "40vh",
                      overflowY: "auto",
                      border: 1,
                      borderColor: "divider",
                    }}
                  >
                    <ListItem key="1">
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            primary="Hey man, What's up ?"
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            secondary="09:30"
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem key="2">
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            primary="Hey, Iam Good! What about you ?"
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            secondary="09:31"
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem key="3">
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            primary="Cool. i am good, let's catch up!"
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            secondary="10:30"
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                  <Divider />
                  <Grid container style={{padding: "20px"}}>
                    <Grid item xs={10}>
                      <TextField
                        id="outlined-basic-email"
                        label="Type Something"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2} align="right">
                      <Fab color="primary" aria-label="add">
                        <SendIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Offer;
