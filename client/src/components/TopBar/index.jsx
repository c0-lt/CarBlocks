import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";

import {useAccount} from "wagmi";

import Account from "./Account";
import {Link as RouterLink} from "react-router-dom";

function TopBar({handleChild}) {
  const {isConnected} = useAccount();
  const [notification, setNotifications] = React.useState(0);

  React.useEffect(() => {
    if (isConnected === true) {
      handleChild(true);
    }
  });

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
          <ButtonBase component={RouterLink} to="/">
            <Box
              component="img"
              src="/logo400x120-white.png"
              alt="logo"
              sx={{width: "120px", mb: "8px"}}
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
            {isConnected && (
              <>
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

                <Button
                  variant="text"
                  className="LinkAppBar"
                  component={RouterLink}
                  to="/account"
                >
                  Mon compte
                </Button>
              </>
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
            <Account />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
