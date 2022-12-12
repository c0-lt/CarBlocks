import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import StarIcon from "@mui/icons-material/Star";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

function Review({axis, review}) {
  console.log(review);
  const getAxisContent = (start, nb) => {
    let content = [];
    for (let i = start; i < start + nb; i++) {
      content.push(
        <Grid container direction="row" alignItems="center" spacing="4">
          <Grid key={"feedback"+i} item>
            <Rating
              name="text-feedback"
              value={3.5}
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit" />}
            />
          </Grid>
          <Grid key={"axis"+i} item>{axis[i]}</Grid>
        </Grid>
      );
    }
    return content;
  };

  return (
    <>
        <Grid key="Avantages" item md={6}>
          Avantages
          <Paper elevation={0} sx={{p: 2, mt: 1, bgcolor: "#c8e6c9"}}>
            { review.pros.split("|").map( pro => (
            <Grid container direction="row" alignItems="center" spacing="4">
              <Grid key={pro} item>
                <AddBoxOutlinedIcon />
              </Grid>
              <Grid key={pro+"description"} item>{pro}</Grid>
            </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid key="Inconvénients" item md={6}>
          Inconvénients
          <Paper elevation={0} sx={{p: 2, mt: 1, bgcolor: "#ffcdd2"}}>
          { review.cons.split("|").map( con => (
            <Grid container direction="row" alignItems="center" spacing="4">
              <Grid key={con+"description"} item>
                <IndeterminateCheckBoxOutlinedIcon />
              </Grid>
              <Grid key={con+"description"} item>{con}</Grid>
            </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid key="details" item md={12}>
          Détails de la note
          <Paper elevation={0} sx={{p: 2, mt: 1, bgcolor: "#fff9c4"}}>
            <Grid container spacing="4">
              {review.notes && (
                <>
              <Grid key="details1" item md={6}>
                {getAxisContent(0, 4)}
              </Grid>
              <Grid key="details2" item md={6}>
                {getAxisContent(4, 4)}
              </Grid>
              </>
              )}
              {!review.notes && (
                <Typography>Aucune note</Typography>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid key="comment" item md={12}>
          Commentaire
          <Paper elevation={0} sx={{p: 2, mt: 1}}>
            <Typography>{review.comment} </Typography>
          </Paper>
        </Grid>
        <Grid key="date" item md={12}>
          Date avis
          <Paper elevation={0} sx={{p: 2, mt: 1}}>
            <Typography>{dayjs.unix(review.date.toNumber()).format("DD-MM-YYYY")} </Typography>
          </Paper>
        </Grid>
    </>
  );
}

export default Review;
