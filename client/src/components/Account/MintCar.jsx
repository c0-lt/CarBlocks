import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {InputAdornment} from "@mui/material";
import {useBackdrop} from "../../contexts/Loader";
import {useSnackbar} from "notistack";
import {useAccount} from "wagmi";
import Pinata from "../../utils/Pinata";

function MintCar({contracts, setTabIndex}) {
  const energyList = [
    "Essence",
    "Diesel",
    "GPL",
    "Electrique",
    "Hybride essence",
    "Hybride diesel",
  ];
  const formId = "formMintCar";
  const backdrop = useBackdrop();
  const {enqueueSnackbar} = useSnackbar();
  const [date, setDate] = React.useState();
  const [picture, setPicture] = React.useState();
  const [picturePath, setPicturePath] = React.useState("");
  const [energy, setEnergy] = React.useState("");
  const {address} = useAccount();

  const callbackError = (error, msg) => {
    console.error(error);
    enqueueSnackbar(msg, {variant: "error"});
    backdrop.hideLoader();
  };

  const callbackPictureSent = (data) => {
    const ImgHashGW = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    enqueueSnackbar("Picture uploaded", {variant: "success"});
    const form = new FormData(document.getElementById(formId));
    let carblock = {
      brand: form.get("brand"),
      model: form.get("model"),
      circulationStartDate: dayjs(date).unix(),
      registrationNumber: form.get("registrationNumber"),
      kilometers: form.get("kilometers"),
      energy: energy,
      image: ImgHashGW,
      VIN: form.get("VIN"),
    };
    Pinata.sendJSON(
      Pinata.convertToIPFSJSON(carblock),
      carblock,
      callbackSendJSON,
      callbackError
    );
  };

  const callbackSendJSON = (data, carblock) => {
    const IpfsHashGW = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    enqueueSnackbar("JSON Metadata uploaded", {variant: "success"});
    // Mint
    mintCarblock(carblock, IpfsHashGW);
  };

  const mintCarblock = async (carblock, URI) => {
    try {
      const carblockContract = contracts.carblocks[carblock.energy];
      await carblockContract.mintCarblock(
        address,
        carblock.circulationStartDate,
        [carblock.VIN, carblock.brand, carblock.model, URI],
        0,
        false
      );
      backdrop.hideLoader();
      enqueueSnackbar(
        "CarBlock minted! Veuillez rafraichir dans quelques secondes.",
        {variant: "success"}
      );
      setTabIndex(0);
    } catch (error) {
      callbackError(error, "Error minting Carblock");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    backdrop.showLoader();
    const form = new FormData(event.currentTarget);
    const data = {
      name: form.get("brand") + " " + form.get("model"),
    };
    const test = !(
      !form.get("brand") ||
      !form.get("model") ||
      !date ||
      !form.get("registrationNumber") ||
      !form.get("kilometers") ||
      !form.get("VIN")
    );
    if (picture && data.name && test) {
      Pinata.sendFile(picture, data, callbackPictureSent, callbackError);
    } else {
      callbackError("Something is missing in form!", "Formulaire incomplet!");
    }
  };

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      setPicturePath(e.target.files[0].name);
    } else {
      setPicture("");
      setPicturePath("");
    }
  };

  const handleChangeEnergy = (event) => {
    setEnergy(event.target.value);
  };

  return (
    <Box width="md" sx={{mx: "auto"}}>
      <Typography variant="h3" gutterBottom>
        D??clarer sa voiture
      </Typography>
      <Box
        component="form"
        id={formId}
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        noValidate
        onSubmit={handleSubmit}
        sx={{mt: 3, mx: "auto"}}
        maxWidth="sm"
      >
        <Grid container spacing={2}>
          <Grid key="VIN" item xs={12}>
            <TextField
              name="VIN"
              required
              fullWidth
              id="VIN"
              label="N?? de s??rie (VIN)"
              autoFocus
            />
          </Grid>
          {/* <TextField
                  required
                  fullWidth
                  id="originalInServiceDate"
                  label="Date de 1??re mise en circulation"
                  name="originalInServiceDate"
                /> */}
          <Grid key="registrationNumber" item xs={12} sm={5}>
            <TextField
              required
              fullWidth
              id="registrationNumber"
              label="N?? immatriculation"
              name="registrationNumber"
            />
          </Grid>
          <Grid key="kilometers" item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="kilometers"
              label="Kilom??tres"
              name="kilometers"
              inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Km</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid key="originalInServiceDate" item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date de 1??re mise en circulation"
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={handleChangeDate}
                id="originalInServiceDate"
                name="originalInServiceDate"
                renderInput={(params) => (
                  <TextField required fullWidth {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid key="brand" item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="brand"
              label="Marque"
              id="brand"
              autoComplete="brand"
            />
          </Grid>
          <Grid key="model" item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="model"
              label="Mod??le"
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
              energy="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Upload
              </Button>
            </label>
          </Grid> */}
          <Grid
            key="energy"
            item
            xs={12}
            sm={6}
            textAlign="left"
            justifyContent="left"
            alignItems="left"
          >
            <FormControl fullWidth>
              <InputLabel id="label-energy">Energy</InputLabel>
              <Select
                labelId="label-energy"
                id="energy"
                required
                value={energy}
                label="Energy"
                onChange={handleChangeEnergy}
              >
                {energyList.map((energyCurrent, i) => (
                  <MenuItem
                    {...(i > 1 ? {disabled: true} : {})}
                    key={i}
                    value={energyCurrent}
                  >
                    {energyCurrent}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid key="picture" item xs={12} sm={6}>
            <Stack direction="row" spacing={1}>
              <TextField
                required
                disabled
                fullWidth
                name="picture"
                label="Photo"
                id="picture"
                value={picturePath}
              />
              <IconButton
                size="large"
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  onChange={handleChangePicture}
                  id="picture"
                  accept="image/*"
                  type="file"
                />
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
