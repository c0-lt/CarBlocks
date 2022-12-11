import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

function About() {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          maxWidth="sm"
          component="img"
          src="logo+title+catchphrase.png"
          alt="logo"
          sx={{mb: "30px"}}
        />
      </Box>

      {/* <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              L'entretien de demain
            </Typography> */}
      <Typography variant="h5" align="justify" color="text.secondary" paragraph>
        Carblocks est une initiative dévelopée par une équipe d’étudiants de
        l’école Alyra dont on ne doit pas rappeler la renommée pour ses
        formations dans la Blockchain.
      </Typography>
      <Typography variant="h5" align="justify" color="text.secondary" paragraph>
        Carblocks révolutionne la conservation des données liées aux véhicules
        (carnet d’entretien, statut), apportant une solution fiable et vérifiée
        de leur enregistrement et sécurisée de leur stockage.
      </Typography>
      <Typography variant="h5" align="justify" color="text.secondary" paragraph>
        Pour les particuliers, elle offre l’accès à des offres exclusives de nos
        partenaires et apporte de la confiance entre vendeurs et acheteurs lors
        d’une vente de véhicule.
      </Typography>
      <Typography variant="h5" align="justify" color="text.secondary" paragraph>
        Pour les professionnels de l’automobile, notre solution offre de
        multiples avantages dans le marketing et la commercialisation des
        entretiens auprès de leur clientèle.
      </Typography>
      <Divider />
      <br />
      <Typography variant="h5" align="left" color="text.secondary" paragraph>
        Notre équipe :
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Grid item>
            <Card sx={{display: "flex"}}>
              <CardMedia
                component="img"
                sx={{width: 151}}
                image="https://gateway.pinata.cloud/ipfs/QmaRdkZKbDteXKuHjbNJeA6qGsszbejZbvdraJ2n6F15bf"
                alt="François Berlier"
              />
              <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent sx={{flex: "1 0 auto"}}>
                  <Typography component="div" variant="h5">
                    François Berlier
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Co-fondateur
                    <br />
                    Expert Commercial
                    <br />
                    Automobile
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4}>
          <Grid item>
            <Card sx={{display: "flex"}}>
              <CardMedia
                component="img"
                sx={{width: 151}}
                image="https://gateway.pinata.cloud/ipfs/QmZcGbVunriBTMAizeciz3Lda74pDDiS6WrvN3Capej8Dw"
                alt="Murielle Colart"
              />
              <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent sx={{flex: "1 0 auto"}}>
                  <Typography component="div" variant="h5">
                    Murielle Colart
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Co-fondatrice
                    <br />
                    Experte finance
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4}>
          <Grid item>
            <Card sx={{display: "flex"}}>
              <CardMedia
                component="img"
                sx={{width: 151}}
                image="https://gateway.pinata.cloud/ipfs/QmNMJRv9bzQKcYv8LNfZDkZJgY5ogZiQnKCR5zjPS6sS15"
                alt="Maxime Lesbros"
              />
              <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent sx={{flex: "1 0 auto"}}>
                  <Typography component="div" variant="h5">
                    Maxime Lesbros
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Co-fondateur
                    <br />
                    Développeur Expert Blockchain
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4}>
          <Grid item>
            <Card sx={{display: "flex"}}>
              <CardMedia
                component="img"
                sx={{width: 151}}
                image="https://gateway.pinata.cloud/ipfs/QmVnyeRgN5C1evcDFuS63CY3SddUU6TQAYouddBrjRPcxt"
                alt="Frédéric Pagotto"
              />
              <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent sx={{flex: "1 0 auto"}}>
                  <Typography component="div" variant="h5">
                    Frédéric Pagotto
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Co-fondateur
                    <br />
                    Expert Stratégie Automobile
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4}>
          <Grid item>
            <Card sx={{display: "flex"}}>
              <CardMedia
                component="img"
                sx={{width: 151}}
                image="https://gateway.pinata.cloud/ipfs/QmNzQWNhmQ5u9ws1BjByP3aLoG1w7YsZgFt8RTXRqCUYz9"
                alt="Gaël Saint-Luc"
              />
              <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent sx={{flex: "1 0 auto"}}>
                  <Typography component="div" variant="h5">
                    Gaël Saint-Luc
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Co-fondateur
                    <br />
                    Ingénieur Support Client
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4} md={4}>
          <Grid item>
            <Card sx={{display: "flex"}}>
              <CardMedia
                component="img"
                sx={{width: 151}}
                image="https://gateway.pinata.cloud/ipfs/QmUxHeA9V23TrcYfpaYrkWtGZXiM1qa3v9u2axZaF8QRiL"
                alt="Quentin Collette"
              />
              <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent sx={{flex: "1 0 auto"}}>
                  <Typography component="div" variant="h5">
                    Quentin Collette
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Co-fondateur
                    <br />
                    Développeur Expert Blockchain
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default About;
