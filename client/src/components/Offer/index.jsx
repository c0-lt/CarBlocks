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
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

import {useParams} from "react-router-dom";

function Offer() {
  const {id} = useParams();

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Mon offre {id}
      </Typography>
      <Container sx={{py: 2}} justifyContent="center" maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
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
                  50.02 €
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
                <Button color="error" variant="outlined">
                  Annuler offre (acheteur)
                </Button>
                <Button color="success" variant="outlined">
                  Accepter (vendeur)
                </Button>
                <Button color="error" variant="outlined">
                  Refuser (vendeur)
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <List sx={{height: '40vh',
    overflowY: 'auto', border: 1, borderColor: 'divider'}}>
              <ListItem key="1">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      primary="Hey man, What's up ?"
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      secondary="09:30"
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="2">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align="left"
                      primary="Hey, Iam Good! What about you ?"
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="left" secondary="09:31"></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="3">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      primary="Cool. i am good, let's catch up!"
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      secondary="10:30"
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Divider />
            <Grid container style={{padding: "20px"}}>
              <Grid item xs={10}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                />
              </Grid>
              <Grid xs={2} align="right">
                <Fab color="primary" aria-label="add">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Offer;
