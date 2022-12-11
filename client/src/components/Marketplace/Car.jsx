import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {useParams} from "react-router-dom";
import {useBackdrop} from "../../contexts/Loader";
import {useSnackbar} from "notistack";
import {useAccount} from "wagmi";
import {useNavigate} from "react-router-dom";
import Pinata from "../../utils/Pinata";

import NewOffer from "./NewOffer";
import dayjs from "dayjs";
import {Divider} from "@mui/material";

// marketplace/:energy/:id
function MarketplaceCar({contracts}) {
  const {id, energy} = useParams();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const backdrop = useBackdrop();
  const {enqueueSnackbar} = useSnackbar();
  const [marketplaceCar, setMarketplaceCar] = React.useState();
  const [contract, setContract] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initCars = React.useCallback(
    async (contracts) => {
      console.log("Init marketplace cars");
      console.log(contracts);
      let myCars = {};
      let i = 0;
      for (let c in contracts.factory) {
        const energyContract = contracts.factory[c];
        const carBlocksContract = contracts.carblocks[contracts.factory[c]];
        myCars[energyContract] = {};
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
            myCars[energyContract][tmpCar.tokenId.toNumber()] = {
              brand: tmpCar.car.brand,
              model: tmpCar.car.model,
              price: tmpCar.price.toNumber(),
              isForSale: tmpCar.isForSale,
              energy: energyContract,
              circulationStartDate: tmpCar.car.circulationStartDate.toNumber(),
              metadata: Pinata.convertCarblockFromMetadata(json),
              id: tmpCar.tokenId.toNumber(),
            };
            i++;
          }
        }
      }
      console.log(myCars);
      // setCars(myCars);
      const myCar = myCars[energy][id];
      setMarketplaceCar(myCar);
      setContract(contracts.carblocks[energy]);
      console.log(contracts.carblocks[energy]);
      console.log(myCar);
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
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Faire une offre
                  </Button>
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
