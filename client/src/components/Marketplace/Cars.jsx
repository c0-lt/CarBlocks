import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import {Link as RouterLink} from "react-router-dom";
import Pinata from "../../utils/Pinata";
import {useBackdrop} from "../../contexts/Loader";
import dayjs from "dayjs";
import {Divider} from "@mui/material";

function Cars({contracts}) {
  const [cars, setCars] = React.useState([]);
  const backdrop = useBackdrop();

  const initCars = React.useCallback(
    async (contracts) => {
      let myCars = [];
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
              key: i,
            };
            if (hasMadeOffer) {
              myCarsWithOffer.push(tmpFinalCar);
            } else {
              myCars.push(tmpFinalCar);
            }
            i++;
          }
        }
      }
      setCars(myCarsWithOffer.concat(myCars));
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
        Marketplace
      </Typography>
      <Container sx={{py: 2}} maxWidth="md">
        {/* End hero unit */}
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
                  <Typography gutterBottom variant="h5" component="h2">
                    {car.brand}&nbsp;{car.model}
                  </Typography>
                  <Typography>
                    {dayjs.unix(car.circulationStartDate).format("YYYY")} |{" "}
                    {car.metadata.kilometers} Kms
                  </Typography>
                  <br />
                  <Divider />
                  <br />
                  <Typography gutterBottom variant="h6" component="h2">
                    Price: {car.price} €
                  </Typography>
                </CardContent>
                <CardActions>
                  {!car.hasMadeOffer && (
                    <Button
                      size="small"
                      component={RouterLink}
                      to={{
                        pathname:
                          "/marketplace/" + car.energy + "/" + car.tokenId,
                      }}
                    >
                      Voir
                    </Button>
                  )}
                  {car.hasMadeOffer && (
                    <Button
                      size="small"
                      component={RouterLink}
                      color="secondary"
                      variant="outlined"
                      to={{
                        pathname: "/offer/" + car.energy + "/" + car.tokenId,
                      }}
                    >
                      Suivre offre
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Cars;
