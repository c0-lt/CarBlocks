import * as React from "react";
import {Routes, Route, Link} from "react-router-dom";

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
  const [contracts, setContracts] = React.useState();
  const [factoryContract, setFactoryContracts] = React.useState();
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const carBlocksArtifact = require("./contracts/CarBlocks.json");
  const carBlocksFactoryArtifact = require("./contracts/CarBlocksFactory.json");

  const handleChild = (status) => {
    console.log("handle status "+status);
    if(factoryContract) {
      status ? setIsWalletConnected(true) : setIsWalletConnected(false);
    } else {
      init();
    }
  };

  const init = React.useCallback(async (carBlocksArtifact, carBlocksFactoryArtifact, factoryContract) => {
    console.log("Init");
    if (carBlocksArtifact && carBlocksFactoryArtifact && !factoryContract) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const networkID = "5777";
      const networkID = await signer.getChainId();
      console.log("NetworkID: "+networkID);

      let carBlocksFactoryContract, carBlocksContract;
      try {
        carBlocksFactoryContract = new ethers.Contract(
          carBlocksFactoryArtifact.networks[networkID].address,
          carBlocksFactoryArtifact.abi,
          signer
        );
        console.log(carBlocksFactoryContract);
      } catch (err) {
        console.error(err);
      }
      setFactoryContracts(carBlocksFactoryContract);
    }
  }, []);

  React.useEffect(() => {
    console.log("Handle connected");
    if(isWalletConnected) {
      console.log("CONNECTED: Handle connected");
      initContracts(factoryContract);
    }
  }, [isWalletConnected]);

 /*  React.useEffect(() => {
    console.log("Contracts effect");
    if(contracts) {
      console.log("Contracts set");
      // TODO

    }
  }, [contracts]); */

  const initContracts = React.useCallback(async (factoryContract) => {
    console.log("Init contracts");
    if (factoryContract) {
      let contractsObject = {factory: [], carblocks: {}};
      console.log(factoryContract);
      const carBlocksContracts = await factoryContract.getCarblocksCollection();
      console.log(carBlocksContracts); // TODO 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      for(let c in carBlocksContracts) {
        const cAddress = carBlocksContracts[c];
        const carBlocksContract = new ethers.Contract(
          cAddress,
          carBlocksArtifact.abi,
          signer
        );
        const energy = await carBlocksContract.energyType();
        contractsObject.carblocks[energy] = carBlocksContract;
        contractsObject.factory.push(energy);
      }
      console.log(contractsObject);
      setContracts(contractsObject);
    }
  }, [factoryContract]);

  React.useEffect(() => {
    console.log("Init effect");
    try {
      init(carBlocksArtifact, carBlocksFactoryArtifact, factoryContract);
    } catch (err) {
      console.error(err);
    }
  }, [init, carBlocksArtifact, carBlocksFactoryArtifact, factoryContract]);

  React.useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      console.log("chain changed");
      init(carBlocksArtifact, carBlocksFactoryArtifact, factoryContract);
    };
    const handleAccountsChange = () => {
      console.log("ether accounts changed");
      initContracts(factoryContract);
    }
    window.ethereum.on("accountsChanged", handleAccountsChange);
    window.ethereum.on("chainChanged", handleChange);
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, carBlocksArtifact, carBlocksFactoryArtifact, factoryContract]);

  return (
    
      <Routes>
        <Route path="/" element={<Layout handleChild={handleChild}/>}>
          <Route index element={<Home />} />
          <Route path="social" element={<Social />} />
          <Route path="social/:id" element={<SocialCar />} />
          <Route path="marketplace" element={<Marketplace contracts={contracts} />} />
          <Route path="marketplace/:energy/:id" element={<MarketplaceCar contracts={contracts} />} />
          <Route path="account" element={<Account contracts={contracts}/>} />
          <Route path="car/:energy/:id" element={<Car contracts={contracts}/>} />
          <Route path="offer/:id" element={<Offer />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
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
