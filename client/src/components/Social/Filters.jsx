import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function Cars() {
 
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [value, setValue] = React.useState([20, 37]);

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
      </Stack>
    </Box>
  );
}

export default Cars;
