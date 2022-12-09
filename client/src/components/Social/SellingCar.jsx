import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import {Link as RouterLink} from "react-router-dom";

function SellingCar({car}) {

  return (
      <Grid item key={car} md={12}>
        <Card sx={{height: "100%", display: "flex", flexDirection: "column"}}>
          <CardActionArea
            component={RouterLink}
            to={{
              pathname: "/marketplace/" + car,
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
                image="https://gateway.pinata.cloud/ipfs/QmdDdTf4YgDFFsKr6VJGjV8hzcPqBfre7DYNdHDXLm43aG"
                alt="random"
              />
              <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="h2">
                  Mclaren 720s
                </Typography>
                <Typography>2022 | 12 256 kms</Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Card>
      </Grid>
  );
}

export default SellingCar;
