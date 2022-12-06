import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

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
