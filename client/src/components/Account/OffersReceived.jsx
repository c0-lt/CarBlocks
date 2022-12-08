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

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from "react-router-dom";

function OffersReceived() {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Offres reçues
      </Typography>
      <Container sx={{py: 2}} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={6}>
              <Card
                sx={{height: "100%", display: "flex", flexDirection: "column"}}
              >
                <CardMedia
                  component="img"
                  image="https://gateway.pinata.cloud/ipfs/QmdDdTf4YgDFFsKr6VJGjV8hzcPqBfre7DYNdHDXLm43aG"
                  alt="random"
                />
                <CardContent sx={{flexGrow: 1}}>
                  <Typography component="h2" variant="h4" color="text.primary">
                    50.02 ETH
                  </Typography>
                  <Typography sx={{mb: 1.5}} color="text.secondary">
                    offer
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Mclaren 720s
                  </Typography>
                  <Typography>2022 | 12 256 kms</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={{
                      pathname: "/offer/" + card,
                    }}
                  >
                    Suivre offre
                  </Button>
                  {/* <Button color="success" size="small">Accepter</Button>
                    <Button color="error" size="small">Refuser</Button> */}
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
