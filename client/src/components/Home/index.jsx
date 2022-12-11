import {useState} from "react";
import Contract from "../Demo/Contract";
import ContractBtns from "../Demo/ContractBtns";
import Menu from "./Menu";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";

function Home() {
  const {isConnected} = useAccount();
  const {connect} = useConnect({
    connector: new InjectedConnector(),
  });
  const {disconnect} = useDisconnect();

  const [value, setValue] = useState("?");

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
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Carblocks est la solution de conservation de votre carnet d’entretien,
        une marketplace et un réseau social, sécurisés par la Blockchain pour
        garantir des informations fiables et immuables !
      </Typography>
      <Stack sx={{pt: 4}} direction="row" spacing={2} justifyContent="center">
        {isConnected ? (
          <>
            <Button
              onClick={() => disconnect()}
              variant="contained"
              size="large"
            >
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => connect()} variant="contained" size="large">
              Connexion Particulier
            </Button>
            <Button variant="outlined" size="large">
              Connexion Professionnel
            </Button>
          </>
        )}
      </Stack>

      {isConnected && <Menu />}
    </>
  );

  /*   return (
    <div className="demo">
    <Intro />
          <hr />
          <WagmiConfig client={client}>
            <Profile />
          </WagmiConfig>
          <hr />
          <Demo />
          </div>
  ); */

  /* return (
    <div className="demo">
      <Title />
      {!state.artifact ? (
        <NoticeNoArtifact />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}

      <Intro />
          <hr />
          <WagmiConfig client={client}>
            <Profile />
          </WagmiConfig>
          <hr />
          <Demo />
    </div>
  );
  */
}

export default Home;
