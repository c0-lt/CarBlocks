import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {useParams} from "react-router-dom";
import {useBackdrop} from "../../contexts/Loader";
import {useAccount} from "wagmi";
import Pinata from "../../utils/Pinata";

import NewOffer from "./NewOffer";
import dayjs from "dayjs";
import {Divider} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

// marketplace/:energy/:id
function MarketplaceCar({contracts}) {
  const {id, energy} = useParams();
  const [open, setOpen] = React.useState(false);
  const backdrop = useBackdrop();
  const [marketplaceCar, setMarketplaceCar] = React.useState();
  const [contract, setContract] = React.useState();
  const {address} = useAccount();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOffers = (offers) => {
    return offers;
  };

  const initCars = React.useCallback(
    async (contracts) => {
      let myCars = {};
      const carBlocksContract = contracts.carblocks[energy];
      myCars = {};
      let tmpCars = await carBlocksContract.getCarblocksForSale();
      for (let h in tmpCars) {
        let tmpCar = tmpCars[h];
        if (tmpCar.isForSale && (parseInt(tmpCar.tokenId.toNumber()) === parseInt(id))) {
          const tokenURI = await carBlocksContract.tokenURI(
            tmpCar.tokenId.toNumber()
          );
          const owner = await carBlocksContract.ownerOf(
            tmpCar.tokenId.toNumber()
          );
          const hasMadeOffer = await carBlocksContract.hasMadeOffer(
            tmpCar.tokenId.toNumber()
          );
          let offers = [];
          const isOwner = address === owner;
          if (isOwner) {
            offers = getOffers(
              await carBlocksContract.getOffers(tmpCar.tokenId.toNumber())
            );
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
            isOwner: isOwner,
          };
          break;
        }
      }
      const myCar = myCars[id];
      setMarketplaceCar(myCar);
      setContract(contracts.carblocks[energy]);
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

  // TODO no getCarblockForSale
  // React.useEffect(() => {
  //   if (contract) {
  //     initMyCar(contract);
  //   }
  // }, [contract]);

  return (
    <>
      {marketplaceCar && contract && (
        <NewOffer
          id={id}
          handleClose={handleClose}
          open={open}
          car={marketplaceCar}
          contract={contract}
        />
      )}
      <Box maxWidth="lg" justifyContent="center">
        <Typography variant="h3" gutterBottom>
          Marketplace
        </Typography>
        <Grid container spacing={6} justifyContent="center">
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
          {marketplaceCar && (
            <>
              <Grid item md={6} justifyContent="center">
                <Box display="flex" justifyContent="center" sx={{mb: "30px"}}>
                  <Box
                    maxWidth="sm"
                    component="img"
                    src={marketplaceCar.metadata.image}
                    alt="logo"
                  />
                </Box>
              </Grid>
              <Grid item md={6} justifyContent="center">
                <Grid container sx={{p: 4, border: 1, borderColor: "divider"}}>
                  <Grid item md={12}>
                    <Typography
                      component="h3"
                      variant="h4"
                      color="inherit"
                      gutterBottom
                    >
                      {marketplaceCar.brand} {marketplaceCar.model}
                    </Typography>
                    <Typography>
                      {dayjs
                        .unix(marketplaceCar.circulationStartDate)
                        .format("YYYY")}{" "}
                      | {marketplaceCar.metadata.kilometers} Kms
                    </Typography>
                    <br />
                    <Divider />
                    <br />
                    <Typography gutterBottom variant="h6" component="h2">
                      Price: {marketplaceCar.price} €
                    </Typography>
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" sx={{mt: 4}}>
                  {!marketplaceCar.hasMadeOffer && (
                    <Button
                      variant="contained"
                      onClick={handleClickOpen}
                      startIcon={<ShoppingCartIcon />}
                    >
                      Faire une offre
                    </Button>
                  )}
                  {marketplaceCar.hasMadeOffer && (
                    <Button
                      size="small"
                      component={RouterLink}
                      color="secondary"
                      variant="outlined"
                      to={{
                        pathname:
                          "/offer/" +
                          marketplaceCar.energy +
                          "/" +
                          marketplaceCar.tokenId,
                      }}
                    >
                      Suivre offre
                    </Button>
                  )}
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default MarketplaceCar;
