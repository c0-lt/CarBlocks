import Typography from "@mui/material/Typography";

function About() {
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Carblocks
      </Typography>
      {/* <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              L'entretien de demain
            </Typography> */}
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Something short and leading about the collection below—its contents, the
        creator, etc. Make it short and sweet, but not too short so folks
        don&apos;t simply skip over it entirely.
      </Typography>
    </>
  );
}

export default About;
