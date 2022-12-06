import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Cars() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box>
       <Typography variant="h3" gutterBottom>
        Marketplace
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
                    image="https://i.gaw.to/vehicles/photos/40/28/402886-2022-mclaren-720s.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Mclaren 720s
                    </Typography>
                    <Typography>
                      2022 | 12 256 kms
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Voir</Button>
                    <Button size="small">Faire une offre</Button>
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
