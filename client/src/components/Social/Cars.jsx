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
import Rating from "@mui/material/Rating";

import {Link as RouterLink} from "react-router-dom";
import Pinata from "../../utils/Pinata";
import {useBackdrop} from "../../contexts/Loader";
import dayjs from "dayjs";
import {Divider} from "@mui/material";
import Utils from "../../utils/Social";

function Cars({contracts}) {
  const [cards, setCards] = React.useState([]);
  const backdrop = useBackdrop();

  const initCards = React.useCallback(
    async (contracts) => {
      console.log("Init social network cards");
      setCards(await Utils.getSocialCards(contracts.socialNetwork));
      backdrop.hideLoader();
    },
    [contracts]
  );

  React.useEffect(() => {
    console.log("Social useEffect");
    if (contracts) {
      backdrop.showLoader();
      initCards(contracts);
    }
  }, [contracts]);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Réseau social
      </Typography>
      <Container sx={{py: 2}} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card.cardId.toNumber()} xs={12} sm={6} md={6}>
              <Card
                sx={{height: "100%", display: "flex", flexDirection: "column"}}
              >
                <CardMedia
                  component="img"
                  image={card.photoURI}
                  alt={card.brand+ " "+card.model}
                />
                <CardContent sx={{flexGrow: 1}}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.brand} {card.model}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={{
                      pathname: "/social/" + card.cardId.toNumber(),
                    }}
                  >
                    Voir
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

export default Cars;
