import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function MintCar() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [value, setValue] = React.useState();
  const [picture, setPicture] = React.useState("");

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleChangePicture = (newValue) => {
    let picturePath = newValue.target.value;
    if(picturePath) {
      const lastIndexOf = picturePath.lastIndexOf('\\');
      picturePath = picturePath.slice(lastIndexOf + 1);
    }
    setPicture(picturePath);
  };

  return (
    <Box width="md" sx={{mx: 'auto'}}>
      <Typography variant="h3" gutterBottom>
        Déclarer sa voiture
      </Typography>
      <Box
        component="form"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        noValidate
        onSubmit={handleSubmit}
        sx={{mt: 3, mx: 'auto'}}
        maxWidth="sm"
      >
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <TextField
              name="vin"
              required
              fullWidth
              id="vin"
              label="N° de série (VIN)"
              autoFocus
            />
          </Grid>
          {/* <TextField
                  required
                  fullWidth
                  id="originalInServiceDate"
                  label="Date de 1ère mise en circulation"
                  name="originalInServiceDate"
                /> */}
          <Grid item xs={12} sm={8}>
            <TextField
              required
              fullWidth
              id="registration"
              label="N° immatriculation"
              name="registration"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date de 1ère mise en circulation"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                id="originalInServiceDate"
                name="originalInServiceDate"
                renderInput={(params) => (
                  <TextField required fullWidth {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="brandname"
              label="Marque"
              id="brandname"
              autoComplete="brandname"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="model"
              label="Modèle"
              id="model"
              autoComplete="model"
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
          <TextField
              required
              disabled
              fullWidth
              name="picture"
              label="Photo"
              id="picture"
            />
            <input
              accept="image/*"
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Upload
              </Button>
            </label>
          </Grid> */}
          <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={1}>
          <TextField
              required
              disabled
              fullWidth
              name="picture"
              label="Photo"
              id="picture"
              value={picture}
            />
          <IconButton size="large" color="primary" aria-label="upload picture" component="label">
            <input hidden onChange={handleChangePicture} id="picture" accept="image/*" type="file" />
            <PhotoCamera fontSize="inherit" />
          </IconButton>
          </Stack>
          </Grid>
          {/* <Grid item xs={12} sm={8}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
        </Grid>
        <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
}

export default MintCar;
