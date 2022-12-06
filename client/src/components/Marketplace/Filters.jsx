import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

function Cars() {
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 50000,
      label: '50k',
    },
    {
      value: 100000,
      label: '100k',
    },
    {
      value: 200000,
      label: '200k',
    },
  ];
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [value, setValue] = React.useState([0, 100000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const valuetext = (value) => {
    return `${value}km`;
  }

  return (
    <Box sx={{ borderRight: 1, borderColor: 'divider', pr: 1, height: '100%' }}>
      <Stack spacing={1}>
       <Typography variant="h4" gutterBottom>
        Filtres
      </Typography>
      <TextField id="outlined-basic" label="Marque" variant="standard" />
      <TextField id="outlined-basic" label="Modèle" variant="standard" />
      <Typography sx={{pt: 2}} id="track-slider" gutterBottom>
        Kilométrage
      </Typography>
      <Box sx={{width: '96%'}}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        aria-labelledby="track-slider"
        step={10000}
        marks={marks}
        min={0} 
        max={200000}
      />
      </Box>
      </Stack>
    </Box>
  );
}

export default Cars;
