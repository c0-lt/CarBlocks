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

function MaintenanceDialog({id, handleClose, open, car}) {
  const backdrop = useBackdrop();

  const maintenanceType = [
    "Remplacement pièces",
    "Remplacement pneus",
    "Révision",
    "Contrôle technique",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    backdrop.showLoader();
    const data = new FormData(event.currentTarget);
    console.log(file);
    console.log({
      serviceDate: dayjs(date).unix(),
      kilometrage: data.get("kilometrage"),
      type: type,
      file: file,
    });
    sendFileToIPFS();
  };

  const sendFileToIPFS = async (e) => {
    if (file) {
      // const FormData = require('form-data');
      const formData = new FormData();
      formData.append("file", file);

      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      console.log(`multipart/form-data; boundary=${formData._boundary}`);

      try {
        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              // pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
              // pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
              Authorization:
                "Bearer " + `${process.env.REACT_APP_PINATA_API_JWT}`,
            },
          }
        );

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        const ImgHashGW = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHashGW);
        backdrop.hideLoader();
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
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
          <DialogContentText>{car}</DialogContentText>
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
                id="kilometrage"
                name="kilometrage"
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
                    <MenuItem key={maintenance} value={maintenance}>{maintenance}</MenuItem>
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
