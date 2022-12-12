import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import {Link as RouterLink} from "react-router-dom";

function SellingCar({card}) {

  return (
    <>
    {card && card.cardId && (
      <Grid item key={card.cardId.toNumber()} md={12}>
        <Card sx={{height: "100%", display: "flex", flexDirection: "column"}}>
          <CardActionArea
            component={RouterLink}
            to={{
              pathname: "/marketplace/" // + car,
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={card.photoURI}
                alt="random"
              />
              <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="h2">
                  Démo {card.cardId.toNumber()}
                </Typography>
                <Typography>2022 | 12 256 kms</Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Card>
      </Grid>
      )}
      </>
  );
}

export default SellingCar;
