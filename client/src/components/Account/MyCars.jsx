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
import dayjs from "dayjs";

import {Link as RouterLink} from "react-router-dom";
import Pinata from "../../utils/Pinata";
import {useBackdrop} from "../../contexts/Loader";

function MyCars({contracts}) {
  const [myCars, setMyCars] = React.useState([]);
  const backdrop = useBackdrop();

  const initMyCars = React.useCallback(
    async (contracts) => {
      let myCars = [];
      let myCarsWithOffer = [];
      let i = 0;
      for (let c in contracts.factory) {
        const energy = contracts.factory[c];
        const carBlocksContract = contracts.carblocks[contracts.factory[c]];
        let tmpCars = await carBlocksContract.getCarblocks();
        for (let h in tmpCars) {
          let tmpCar = tmpCars[h];
          const tokenURI = await carBlocksContract.tokenURI(
            tmpCar.tokenId.toNumber()
          );
          const response = await fetch(tokenURI);
          const json = await response.json();

          let offers = [];
          offers = await carBlocksContract.getOffers(tmpCar.tokenId.toNumber());
          const hasOffer = offers.length > 0;
          let tmpFinalCar = {
            brand: tmpCar.car.brand,
            model: tmpCar.car.model,
            energy: energy,
            circulationStartDate: tmpCar.car.circulationStartDate.toNumber(),
            metadata: Pinata.convertCarblockFromMetadata(json),
            tokenId: tmpCar.tokenId.toNumber(),
            offers: offers,
            hasOffer: hasOffer,
            isForSale: tmpCar.isForSale,
            price: tmpCar.price.toNumber(),
            key: i,
          };
          if (hasOffer) {
            myCarsWithOffer.push(tmpFinalCar);
          } else {
            myCars.push(tmpFinalCar);
          }
          i++;
        }
      }
      setMyCars(myCarsWithOffer.concat(myCars));
      backdrop.hideLoader();
    },
    [contracts]
  );

  React.useEffect(() => {
    if (contracts) {
      backdrop.showLoader();
      initMyCars(contracts);
    }
  }, [contracts]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3" gutterBottom>
          Mes voitures
        </Typography>
        {/* <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<DirectionsCarIcon />}
        >
          Déclarer une voiture
        </Button> */}
      </Box>
      <Container sx={{py: 2}} maxWidth="md">
        {/* End hero unit */}
        {myCars && myCars.length === 0 && (
          <Typography variant="h5" gutterBottom>
            Aucune voiture
          </Typography>
        )}
        <Grid container spacing={4}>
          {myCars.map((car) => (
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
                    Date de 1ère mise en circulation:
                    {dayjs.unix(car.circulationStartDate).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography>
                    Kilométrage: {car.metadata.kilometers} kms
                  </Typography>
                  {car.isForSale  && (
                    <Typography variant="h6">
                      En vente: {car.price} €
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={{
                      pathname: "/car/" + car.energy + "/" + car.tokenId,
                    }}
                  >
                    Voir
                  </Button>
                  {car.isForSale && car.hasOffer && (
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
                  {/* <Button size="small">Ajouter entretien</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
          {Object.entries(myCars) === 0 && (
            <Grid item key={-1} xs={12} sm={12} md={12}>
              <Typography>Aucune voiture</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default MyCars;
