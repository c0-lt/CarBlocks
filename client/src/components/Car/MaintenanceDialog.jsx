import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

import IconButton from "@mui/material/IconButton";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

import axios from "axios";
import {useBackdrop} from "../../contexts/Loader";
import Pinata from "../../utils/Pinata";
import {useSnackbar} from "notistack";

function MaintenanceDialog({handleClose, open, car, contract, maintenanceType}) {
  const backdrop = useBackdrop();
  const {enqueueSnackbar} = useSnackbar();

  const callbackError = (error, msg) => {
    console.error(error);
    enqueueSnackbar(msg, {variant: "error"});
    backdrop.hideLoader();
  };

  const handleBillSent = async (data, form) => {
    console.log("picture sent");
    // console.log(carblock);
    const ImgHash = `ipfs://${data.IpfsHash}`;
    console.log(ImgHash);
    const URI = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    console.log(URI);
    enqueueSnackbar("Bill uploaded", {variant: "success"});
    // console.log([car.id, form.serviceDate, maintenanceType.indexOf(form.type),form.kilometers, URI]);
    try {
      await contract.addMaintenance(
        car.id,
        form.serviceDate,
        maintenanceType.indexOf(form.type),
        form.kilometers,
        URI
      );
      enqueueSnackbar(
        "Maintenance ajoutée! Veuillez rafraichir dans quelques secondes.",
        {variant: "success"}
      );
      backdrop.hideLoader();
      handleClose();
    } catch (error) {
      callbackError(error, "Error minting Carblock");
      // console.log("Error sending File to IPFS: ");
      // console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    backdrop.showLoader();
    const data = new FormData(event.currentTarget);
    const form = {
      serviceDate: dayjs(date).unix(),
      kilometers: data.get("kilometers"),
      type: type,
    };
    console.log(form);
    Pinata.sendFile(file, form, handleBillSent, callbackError);
  };

  const [date, setDate] = React.useState(dayjs());
  const [file, setFile] = React.useState("");
  const [filePath, setFilePath] = React.useState("");
  const [type, setType] = React.useState("");

  const handleChangeDate = (newValue) => {
    console.log(newValue);
    setDate(newValue);
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    let filePathTmp = e.target.value;
    if (filePathTmp) {
      const lastIndexOf = filePathTmp.lastIndexOf("\\");
      filePathTmp = filePathTmp.slice(lastIndexOf + 1);
    }
    setFilePath(filePathTmp);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        textAlign="center"
        alignItems="center"
        noValidate
        onSubmit={handleSubmit}
        sx={{mt: 3, mx: "auto"}}
        maxWidth="sm"
      >
        <DialogTitle>Ajouter un entretien</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {car.brand} {car.model}
          </DialogContentText>
          <Grid container spacing={2} sx={{mt: 2}} textAlign="left">
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="kilometers"
                name="kilometers"
                required
                label="Kilométrage"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Km</InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
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
                    <MenuItem key={maintenance} value={maintenance}>
                      {maintenance}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1}>
                <TextField
                  required
                  disabled
                  fullWidth
                  name="file"
                  label="Facture"
                  id="file"
                  value={filePath}
                />
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="upload file"
                  component="label"
                >
                  <input
                    hidden
                    onChange={handleChangeFile}
                    id="file"
                    accept="application/pdf"
                    type="file"
                  />
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
