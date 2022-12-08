import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import FormControl from '@mui/material/FormControl';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import StarIcon from "@mui/icons-material/Star";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddCommentIcon from "@mui/icons-material/AddComment";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

import {useParams, Link as RouterLink} from "react-router-dom";

function MaintenanceDialog({id, handleClose, open, car}) {
  const maintenanceType = ["Remplacement pièces",
    , "Remplacement pneus"
    , "Révision"
    , "Contrôle technique"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [date, setDate] = React.useState();
  const [file, setFile] = React.useState("");

  const handleChangeDate = (newValue) => {
    console.log(newValue);
    setDate(newValue);
  };

  const handleChangeFile = (newValue) => {
    let filePath = newValue.target.value;
    if(filePath) {
      const lastIndexOf = filePath.lastIndexOf('\\');
      filePath = filePath.slice(lastIndexOf + 1);
    }
    setFile(filePath);
  };

  const [type, setType] = React.useState('');

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        noValidate
        onSubmit={handleSubmit}
        sx={{mt: 3, mx: "auto"}}
        maxWidth="sm"
      >
        <DialogTitle>Ajouter un entretien</DialogTitle>
        <DialogContent>
          <DialogContentText>{car}</DialogContentText>
          <Grid container spacing={2} sx={{mt: 2}} justifyContent="center">
            <Grid item xs={6} >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date entretien"
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={handleChangeDate}
                id="serviceDate"
                name="serviceDate"
                renderInput={(params) => (
                  <TextField required fullWidth {...params} />
                )}
              />
            </LocalizationProvider>
            </Grid>
            <Grid item xs={6} >
            <TextField fullWidth
              id="kilometrage"
              required
              label="Kilométrage"
              autoFocusffe
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    Km
                  </InputAdornment>
                ),
              }}
            >
            </TextField>
            </Grid>
            <Grid item xs={6} >
            <FormControl fullWidth>
              <InputLabel id="label-type">Type</InputLabel>
              <Select
                labelId="label-type"
                id="type"
                value={type}
                label="Type"
                onChange={handleChangeType}
              >
                {maintenanceType.map((maintenance) => (
                  <MenuItem value={maintenance}>{maintenance}</MenuItem>
                ))}
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} >
            <Stack direction="row" spacing={1}>
          <TextField
              required
              disabled
              fullWidth
              name="file"
              label="Facture"
              id="file"
              value={file}
            />
          <IconButton size="large" color="primary" aria-label="upload file" component="label">
            <input hidden onChange={handleChangeFile} id="file" accept="application/pdf" type="file" />
            <RequestQuoteIcon fontSize="inherit" />
          </IconButton>
          </Stack>
            </Grid>
            
          </Grid>
          <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
            Enregistrer entretien
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default MaintenanceDialog;
