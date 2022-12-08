import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import StarIcon from "@mui/icons-material/Star";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

function Review({axis}) {

  const getAxisContent = (start, nb) => {
    let content = [];
    for (let i = start; i < start + nb; i++) {
      content.push(
        <Grid container direction="row" alignItems="center" spacing="4">
          <Grid item>
            <Rating
              name="text-feedback"
              value="3.5"
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit" />}
            />
          </Grid>
          <Grid item>{axis[i]}</Grid>
        </Grid>
      );
    }
    return content;
  };

  return (
    <>
        <Grid item md={6}>
          Avantages
          <Paper elevation={0} sx={{p: 2, mt: 1, bgcolor: "#c8e6c9"}}>
            <Grid container direction="row" alignItems="center" spacing="4">
              <Grid item>
                <AddBoxOutlinedIcon />
              </Grid>
              <Grid item>Test description</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing="4">
              <Grid item>
                <AddBoxOutlinedIcon />
              </Grid>
              <Grid item>Test description 2</Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={6}>
          Inconvénients
          <Paper elevation={0} sx={{p: 2, mt: 1, bgcolor: "#ffcdd2"}}>
            <Grid container direction="row" alignItems="center" spacing="4">
              <Grid item>
                <IndeterminateCheckBoxOutlinedIcon />
              </Grid>
              <Grid item>Test description</Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={12}>
          Détails de la note
          <Paper elevation={0} sx={{p: 2, mt: 1, bgcolor: "#fff9c4"}}>
            <Grid container spacing="4">
              <Grid item md={6}>
                {getAxisContent(0, 4)}
              </Grid>
              <Grid item md={6}>
                {getAxisContent(4, 4)}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={12}>
          Commentaire
          <Paper elevation={0} sx={{p: 2, mt: 1}}>
            <Typography>Commentaire </Typography>
          </Paper>
        </Grid>
    </>
  );
}

export default Review;
