import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';

import {useAccount} from "wagmi";

import Address from "./Address";
import useEth from "../../contexts/EthContext/useEth";
import {useSnackbar} from "notistack";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from "react-router-dom";

function TopBar() {
  const {address, isConnected} = useAccount();
  const open = true;
  const {
    state: {contract},
  } = useEth();
  const [notification, setNotifications] = React.useState(0);
  const [subscribed, setSubscribed] = React.useState(false);
  let notifCount = 0; // Lack of react knowledge

  const {enqueueSnackbar} = useSnackbar();

  const addNotif = React.useCallback(() => {
    console.log("From notif " + notifCount);
    // let _notification = notification + 1;
    setNotifications(++notifCount);
  }, [notifCount]);

  /* 
  const subscribeEvent = React.useCallback(() => {
    if (contract && !subscribed) {
      contract.events
        .ProposalRegistered(() => {})
        .on("connected", function (subscriptionId) {
          console.log("SubID: ", subscriptionId);
        })
        .on("data", function (event) {
          console.log("Event: " + event);
          console.log("Proposal ID: " + event.returnValues.proposalId);
          // addProposalId(event.returnValues.proposalId);
          addNotif();
          enqueueSnackbar(
            "New proposal added, ID: " + event.returnValues.proposalId,
            {variant: "info"}
          );
        })
        .on("changed", function (event) {
          //Do something when it is removed from the database.
        })
        .on("error", function (error, receipt) {
          console.log("Error:", error, receipt);
        });
      setSubscribed(true);
    }
  }, [contract, enqueueSnackbar, addNotif, subscribed]); 
  */

  /* 
  const addProposalId = (proposalId) => {
    setProposalsId(current => [...current, proposalId]);
  } 
  */

  /* 
  React.useEffect(() => {
    console.log("Top bar");
    if (contract) {
      subscribeEvent();
    }
  }, [contract, subscribeEvent]); // empty array means nothing to watch, so run once and no more
 */
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="static"
        style={
          {
            /*background: '#2E3B55'*/
          }
        }
      >
        <Toolbar variant="dense">
          <ButtonBase component={RouterLink}
              to="/">
          <Box
            component="img"
            src="logo400x120-white.png"
            alt="logo"
            sx={{width: "120px"}}
          />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ml: "10px", display: {xs: "block", sm: "block"}}}
          >
            Carblocks
          </Typography>
          </ButtonBase>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {xs: "flex", md: "flex"}}}>
            {/* <Button
              variant="text"
              className="LinkAppBar"
              component={RouterLink}
              to="/"
            >
              Accueil
            </Button> */}
            <Button
              variant="text"
              className="LinkAppBar"
              component={RouterLink}
              to="/social"
            >
              Réseau social
            </Button>
            <Button
              variant="text"
              className="LinkAppBar"
              component={RouterLink}
              to="/marketplace"
            >
              Marketplace
            </Button>
            {isConnected && (
              <Button
                variant="text"
                className="LinkAppBar"
                component={RouterLink}
                to="/car"
              >
                Mes véhicules
              </Button>
            )}
            <Button
              variant="text"
              className="LinkAppBar"
              component={RouterLink}
              to="/about"
            >
              à propos
            </Button>
          </Box>
          <Box sx={{display: {xs: "flex", md: "flex"}}}>
            <IconButton
              size="large"
              aria-label="new notifications"
              color="inherit"
            >
              <Badge badgeContent={notification} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Address />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
