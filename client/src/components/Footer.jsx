import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box
    component="footer"
    sx={{
      p: 1,
      // mt: 'auto',
      /* backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800], */
    }}
  >
    <Typography variant="body2" color="text.secondary" align='center'>
      Carblocks © 2023 - Tous droits réservés
      </Typography>
      </Box>
  );
}

export default Footer;
