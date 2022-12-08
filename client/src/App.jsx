import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

import Container from '@mui/material/Container';

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
    provider: getDefaultProvider(),
  });

  return (
    <WagmiConfig client={client}>
      <Routes>
        <Route path="/" element={<Layout />}>
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
    <Container sx={{
      mt: 1,
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6,
    }} maxWidth="sm">
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
