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
import {Divider} from "@mui/material";
import {useAccount} from "wagmi";

function MyOffers({contracts}) {
  const [cars, setCars] = React.useState([]);
  const backdrop = useBackdrop();
  const {address, isConnected} = useAccount();

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
      console.log("Init marketplace cars");
      let carsWithOffer = [];
      let i = 0;
      for (let c in contracts.factory) {
        const energy = contracts.factory[c];
        const carBlocksContract = contracts.carblocks[contracts.factory[c]];
        let tmpCars = await carBlocksContract.getCarblocksForSale();
        for (let h in tmpCars) {
          let tmpCar = tmpCars[h];
          console.log(tmpCar);
          // console.log((parseInt(h)+1));
          // console.log(json.image);
          if (tmpCar.isForSale) {
            // TODO waiting for Quentin to solve issue on getCarblocksForSale
            const tokenURI = await carBlocksContract.tokenURI(
              // TODO uncomment below when Quentin set tokenURI public
              tmpCar.tokenId.toNumber()
              // 1
            );
            console.log(tokenURI);
            const response = await fetch(tokenURI);
            const json = await response.json();
            const hasMadeOffer = await carBlocksContract.hasMadeOffer(
              tmpCar.tokenId.toNumber()
            );
            let offer = getOffer();
            if(hasMadeOffer) {
              console.log("made offer");
              offer = getOffer(await carBlocksContract.getOffer(tmpCar.tokenId.toNumber()));
            }
            const owner = await carBlocksContract.ownerOf(
              tmpCar.tokenId.toNumber()
            );
            const isOwner = address == owner;
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
              key: i,
              offer: offer
            };
            if (hasMadeOffer && !isOwner) {
              carsWithOffer.push(tmpFinalCar);
            }
            i++;
          }
        }
      }
      console.log(carsWithOffer);
      setCars(carsWithOffer);
      backdrop.hideLoader();
    },
    [contracts]
  );

  React.useEffect(() => {
    console.log("My offers useEffect");
    if (contracts) {
      backdrop.showLoader();
      initCars(contracts);
    }
  }, [contracts]);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Mes offres
      </Typography>
      <Container sx={{py: 2}} maxWidth="md">
        {cars && cars.length == 0 && (
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
                        "/offer/" +
                        car.energy +
                        "/" +
                        car.tokenId,
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

export default MyOffers;
