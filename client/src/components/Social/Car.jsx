import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import AddCommentIcon from '@mui/icons-material/AddComment';

import {useParams} from "react-router-dom";

import Review from './Review';
import SellingCar from './SellingCar';
import NewReview from './NewReview';

import {Link as RouterLink} from "react-router-dom";
import Pinata from "../../utils/Pinata";
import {useBackdrop} from "../../contexts/Loader";
import dayjs from "dayjs";
import {Divider} from "@mui/material";
import Utils from "../../utils/Social";

function SocialCar({contracts}) {
  const {id} = useParams();
  const cards = [1];
  const axis = ["Sécurité", "Budget", "Confort", "Conduite", "Equipements de série", "Qualité de la finition", "Fiabilité", "Ecologie"];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [card, setCard] = React.useState();
  const backdrop = useBackdrop();

  const initCard = React.useCallback(
    async (contracts) => {
      const cards = await Utils.getSocialCards(contracts.socialNetwork);
      console.log(cards);
      let card = {};
      card.card = cards[id-1];
      if(card && card.card.cardId) {
        // card.opinions = await Utils.getSocialOpinions(contracts.socialNetwork, card.card.cardId.toNumber());
        card.opinions = [];
        card.opinions.push(await Utils.getSocialOpinions(contracts.socialNetwork, card.card.cardId.toNumber()));
        card.hasOpinions = (card.opinions.length > 0)
      }
      setCard(card);
      backdrop.hideLoader();
    },
    [contracts]
  );

  React.useEffect(() => {
    console.log("Social car useEffect");
    if (contracts) {
      backdrop.showLoader();
      initCard(contracts);
    }
  }, [contracts]);

  return (
    <>
    {!card && (
      <Typography
      component="h3"
      variant="h4"
      color="inherit"
      gutterBottom
    >
      Fiche introuvable
    </Typography>
    )}
    {card && (
      <>
    <NewReview contract={contracts.socialNetwork} id={id} handleClose={handleClose} open={open} car={card}/>
    <Box maxWidth="lg" spacing={2}>
      <Paper
        sx={{
          minHeight: "200px",
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(`+card.card.photoURI+`)`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{display: "none"}}
            src={card.card.photoURI}
            alt={card.card.brand+" "+card.card.model}
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item key="car" md={6}>
            <Box
              sx={{
                position: "relative",
                p: {xs: 3, md: 6},
                pr: {md: 0},
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {card.card.brand+" "+card.card.model}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item key="review" md={8}>
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                component="h3"
                variant="h4"
                color="inherit"
                gutterBottom
              >
                Avis
              </Typography>
              <Button variant="contained" onClick={handleClickOpen} startIcon={<AddCommentIcon />}>Ajouter un avis</Button>
            </Box>
          </Box>
          {card && !card.hasOpinions && (
            <Typography>Aucun avis pour le moment</Typography>
          )}
          {card && card.hasOpinions && (
          <Grid container spacing={2} sx={{mt: 2, p: 1, border: 1, borderColor: 'divider'}}>
              {/* @TODO MAP */}
              {card.opinions.map(opinion => (
                <Review review={opinion} axis={axis}/>
              ))}
          </Grid>
          )}
        </Grid>
        <Grid item key="sellingCar" md={4}>
          <Box>
            <Typography
              component="h3"
              variant="h4"
              color="inherit"
              gutterBottom
            >
              Véhicules en vente
            </Typography>
          </Box>
          <Grid container spacing={4}>
              <SellingCar card={card}/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </>
    )}
    </>
  );
}

export default SocialCar;
