import {useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "../Demo/Title";
import Contract from "../Demo/Contract";
import ContractBtns from "../Demo/ContractBtns";
import NoticeNoArtifact from "../Demo/NoticeNoArtifact";
import NoticeWrongNetwork from "../Demo/NoticeWrongNetwork";
import Menu from "./Menu";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";

import {EthProvider} from "../../contexts/EthContext";
import {SnackbarProvider} from "notistack";
import Intro from "../Intro";
import Demo from "../Demo";
import Footer from "../Footer";
import Profile from "../Profile";
import TopBar from "../TopBar";

function Home() {
  const {address, isConnected} = useAccount();
  const {connect} = useConnect({
    connector: new InjectedConnector(),
  });
  const {disconnect} = useDisconnect();

  const {state} = useEth();
  const [value, setValue] = useState("?");

  const demo = (
    <>
      <div className="contract-container">
        <Contract value={value} />
        <ContractBtns setValue={setValue} />
      </div>
    </>
  );

  return (
    <Container
      sx={{
        mt: 5,
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
      maxWidth="sm"
    >
      <Box
        maxWidth="sm"
        component="img"
        src="logo+title+catchphrase.png"
        alt="logo"
        sx={{mb: "30px"}}
      />
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
              Particulier
            </Button>
            <Button variant="outlined" size="large">
              Professionnel
            </Button>
          </>
        )}
      </Stack>

      {isConnected && <Menu />}
    </Container>
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
