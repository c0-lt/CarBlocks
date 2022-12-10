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
import {ethers} from "ethers";
import Pinata from "../../utils/Pinata";
import {useBackdrop} from "../../contexts/Loader";

function MyCars({contracts}) {
  const [myCars, setMyCars] = React.useState({});
  const backdrop = useBackdrop();

  const initMyCars = React.useCallback(
    async (contracts) => {
      console.log("Init my cars");
      let myCars = {};
      for (let c in contracts.factory) {
        const carBlocksContract = contracts.carblocks[contracts.factory[c]];
        let tmpCars = await carBlocksContract.getCarblocks();
        for (let h in tmpCars) {
          let tmpCar = tmpCars[h];
          console.log(tmpCar);
          // console.log((parseInt(h)+1));
          const tokenURI = await carBlocksContract.tokenURI(tmpCar.tokenId.toNumber()); // TODO use tokenId
          // console.log(tokenURI);
          const response = await fetch(tokenURI);
          const json = await response.json();
          // console.log(json.image);
          myCars[h] = {
            brand: tmpCar.car.brand,
            model: tmpCar.car.model,
            circulationStartDate: tmpCar.car.circulationStartDate.toNumber(),
            metadata: Pinata.convertCarblockFromMetadata(json),
            id: h,
          };
        }
      }
      console.log(myCars);
      setMyCars(myCars);
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

  const cards = [1, 2, 3, 4, 5, 6];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <Grid container spacing={4}>
          {Object.entries(myCars).map(([key, car]) => (
            <Grid item key={key} xs={12} sm={6} md={6}>
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
                    Date de 1ère mise en circulation:{" "}
                    {dayjs.unix(car.circulationStartDate).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography>
                    Kilométrage: {car.metadata.kilometers} kms
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={{
                      pathname: "/car/" + car.id,
                    }}
                  >
                    Voir
                  </Button>
                  {/* <Button size="small">Ajouter entretien</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
          {Object.entries(myCars) == 0 && (
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
