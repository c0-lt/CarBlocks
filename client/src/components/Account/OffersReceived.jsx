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

import {Link as RouterLink} from "react-router-dom";
import Pinata from "../../utils/Pinata";
import {useBackdrop} from "../../contexts/Loader";
import dayjs from "dayjs";
import {useAccount} from "wagmi";

function OffersReceived({contracts}) {
  const [cars, setCars] = React.useState([]);
  const backdrop = useBackdrop();
  const {address} = useAccount();

  const getOffer = (offer) => {
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
      let myCarsWithOffer = [];
      let i = 0;
      for (let c in contracts.factory) {
        const energy = contracts.factory[c];
        const carBlocksContract = contracts.carblocks[contracts.factory[c]];
        let tmpCars = await carBlocksContract.getCarblocksForSale();
        for (let h in tmpCars) {
          let tmpCar = tmpCars[h];
          if (tmpCar.isForSale) {
            // TODO waiting for Quentin to solve issue on getCarblocksForSale
            const tokenURI = await carBlocksContract.tokenURI(
              // TODO uncomment below when Quentin set tokenURI public
              tmpCar.tokenId.toNumber()
              // 1
            );
            const response = await fetch(tokenURI);
            const json = await response.json();
            const hasMadeOffer = await carBlocksContract.hasMadeOffer(
              tmpCar.tokenId.toNumber()
            );
            let hasReceivedOffer = false;
            let offers = [];
            let offer = {price: 0, user: "", recipient: ""};
            const owner = await carBlocksContract.ownerOf(
              tmpCar.tokenId.toNumber()
            );
            const isOwner = (address === owner);
            if (isOwner) {
              offers = await carBlocksContract.getOffers(
                tmpCar.tokenId.toNumber()
              );
              // TODO Improve, retrieves only the first offer
              offer = getOffer(offers[0]);
              hasReceivedOffer = offers.length > 0;
            }
            let tmpFinalCar = {
              brand: tmpCar.car.brand,
              model: tmpCar.car.model,
              price: tmpCar.price.toNumber(),
              isForSale: tmpCar.isForSale,
              energy: energy,
              circulationStartDate: tmpCar.car.circulationStartDate.toNumber(),
              metadata: Pinata.convertCarblockFromMetadata(json),
              tokenId: tmpCar.tokenId.toNumber(),
              hasMadeOffer: hasMadeOffer,
              isOwner: isOwner,
              offers: offers,
              offer: offer,
              key: i,
            };
            if (hasReceivedOffer && isOwner) {
              myCarsWithOffer.push(tmpFinalCar);
            }
            i++;
          }
        }
      }
      setCars(myCarsWithOffer);
      backdrop.hideLoader();
    },
    [contracts]
  );

  React.useEffect(() => {
    if (contracts) {
      backdrop.showLoader();
      initCars(contracts);
    }
  }, [contracts]);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Offres reçues
      </Typography>
      <Container sx={{py: 2}} maxWidth="md">
        {cars && cars.length === 0 && (
          <Typography variant="h5" gutterBottom>
            Aucune offre en cours
          </Typography>
        )}

        <Grid container spacing={4}>
          {cars.map((car) => (
            <Grid item key={car.key} xs={12} sm={6} md={6}>
              <Card
                sx={{height: "100%", display: "flex", flexDirection: "column"}}
              >
                <CardMedia
                  component="img"
                  image={car.metadata.image}
                  alt="random"
                />
                <CardContent sx={{flexGrow: 1}}>
                  <Typography component="h2" variant="h4" color="text.primary">
                    {car.offer.price} €
                  </Typography>
                  <Typography sx={{mb: 1.5}} color="text.secondary">
                    Offre
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {car.brand} {car.model}
                  </Typography>
                  <Typography>
                    {dayjs.unix(car.circulationStartDate).format("YYYY")} |{" "}
                    {car.metadata.kilometers} Kms
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={{
                      pathname:
                        "/offer/" + car.metadata.energy + "/" + car.tokenId,
                    }}
                  >
                    Suivre offre
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default OffersReceived;
