import * as React from "react";
import {Routes, Route, Link} from "react-router-dom";

import {WagmiConfig, createClient} from "wagmi";
import {ethers} from "ethers";

import Container from "@mui/material/Container";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Social from "./components/Social";
import SocialCar from "./components/Social/Car";
import Marketplace from "./components/Marketplace";
import MarketplaceCar from "./components/Marketplace/Car";
import Account from "./components/Account";
import About from "./components/About";
import Offer from "./components/Offer";

import "./App.css";
import Car from "./components/Car";

function App() {
  const client = createClient({
    autoConnect: true,
    provider: new ethers.providers.Web3Provider(window.ethereum),
  });
  const [contracts, setContracts] = React.useState({});
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const carBlocksArtifact = require("./contracts/CarBlocks.json");
  const carBlocksFactoryArtifact = require("./contracts/CarBlocksFactory.json");

  const handleChild = (status) => {
    console.log("handle status"+status);
    status ? setIsWalletConnected(true) : setIsWalletConnected(false);
  };

  const init = React.useCallback((carBlocksArtifact, carBlocksFactoryArtifact) => {
    console.log("Init");
    if (carBlocksArtifact && carBlocksFactoryArtifact) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("provider");
      console.log(provider);
      const networkID = "5777";
      const signer = provider.getSigner();

      let carBlocksFactoryContract, carBlocksContract;
      try {
        carBlocksFactoryContract = new ethers.Contract(
          carBlocksFactoryArtifact.networks[networkID].address,
          carBlocksFactoryArtifact.abi,
          signer
        );
        carBlocksContract = new ethers.Contract(
          carBlocksArtifact.networks[networkID].address,
          carBlocksArtifact.abi,
          signer
        );
        console.log(carBlocksFactoryContract);
        console.log(carBlocksContract);
      } catch (err) {
        console.error(err);
      }
      // setContracts({factory: carBlocksFactoryContract});
    }
  }, []);

  React.useEffect(() => {
    console.log("Handle contract change");
    // if(isWalletConnected) {
    //   console.log("CONNECTED: Handle contract change");
    // }
  }, [contracts]);

  React.useEffect(() => {
    console.log("Init effect");
    try {
      init(carBlocksArtifact, carBlocksFactoryArtifact);
    } catch (err) {
      console.error(err);
    }
  }, [init, carBlocksArtifact, carBlocksFactoryArtifact]);

  React.useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      console.log("ether change");
      init();
    };
    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, carBlocksArtifact, carBlocksFactoryArtifact]);

  return (
    <WagmiConfig client={client}>
      <Routes>
        <Route path="/" element={<Layout handleChild={handleChild}/>}>
          <Route index element={<Home />} />
          <Route path="social" element={<Social />} />
          <Route path="social/:id" element={<SocialCar />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/:id" element={<MarketplaceCar />} />
          <Route path="account" element={<Account />} />
          <Route path="car/:id" element={<Car />} />
          <Route path="offer/:id" element={<Offer />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </WagmiConfig>
  );
}

function NoMatch() {
  return (
    <Container
      sx={{
        mt: 1,
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
      maxWidth="sm"
    >
      <div>
        <h2>Erreur 404 - page introuvable</h2>
        <p>
          <Link to="/">Retournez à l'accueil</Link>
        </p>
      </div>
    </Container>
  );
}

export default App;
