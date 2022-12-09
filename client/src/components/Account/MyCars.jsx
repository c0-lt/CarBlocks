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

function MyCars() {
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
                  <Typography gutterBottom variant="h5" component="h2">
                    Mclaren 720s
                  </Typography>
                  <Typography>
                    Date de 1ère mise en circulation: 26/11/2022
                  </Typography>
                  <Typography>Kilométrage: 12 256 kms</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={{
                      pathname: "/car/" + card,
                    }}
                  >
                    Voir
                  </Button>
                  {/* <Button size="small">Ajouter entretien</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default MyCars;
