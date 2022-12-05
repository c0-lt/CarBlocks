import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { EthProvider } from "./contexts/EthContext";
import { SnackbarProvider } from 'notistack';
import Layout from "./components/Layout";
import Home from "./components/Home";
import Social from "./components/Social";
import Marketplace from "./components/Marketplace";
import Car from "./components/Car";
import About from "./components/About";

import "./App.css";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="social" element={<Social />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="car" element={<Car />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
    </Routes>
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
