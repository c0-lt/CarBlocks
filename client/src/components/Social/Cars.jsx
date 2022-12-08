import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from "react-router-dom";

function Cars() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box>
       <Typography variant="h3" gutterBottom>
        Réseau social
      </Typography>
      <Container sx={{ py: 2 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://gateway.pinata.cloud/ipfs/QmdDdTf4YgDFFsKr6VJGjV8hzcPqBfre7DYNdHDXLm43aG"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Mclaren 720s
                    </Typography>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={RouterLink}
                    to={{
                      pathname: "/social/" + card,
                    }}>Voir</Button>
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
