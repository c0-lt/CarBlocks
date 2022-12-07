import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from "react-router-dom";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";
import {Divider, ListItemIcon, ListItemText} from "@mui/material";

function Account() {
  const {address, isConnected} = useAccount();
  const {connect} = useConnect({
    connector: new InjectedConnector(),
  });
  const {disconnect} = useDisconnect();
  const wrapAddress = (text) => {
    return text.slice(0, 6) + "..." + text.slice(-4);
  };
  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDisconnect = () => {
    disconnect();
    setAnchorEl(null);
  };

  const handleConnect = () => {
    connect();
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      sx={{mt: 3}}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isConnected ? (
        <>
          <MenuItem
            onClick={handleMenuClose}
            component={RouterLink}
            to="/account"
          >
            <ListItemIcon>
              <ManageAccountsIcon/>
            </ListItemIcon>
            <ListItemText>
            Mon compte
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDisconnect}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText>
            Déconnexion
            </ListItemText>
            </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleConnect}>
          <ListItemIcon>
              <LoginIcon/>
            </ListItemIcon>
            <ListItemText>
            Connexion
            </ListItemText>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <Tooltip
        onClick={handleProfileMenuOpen}
        sx={{mt: "5px"}}
        title="My ETH address"
      >
        {isConnected ? (
          <Chip
            size="medium"
            color="secondary"
            icon={<AccountCircle fontSize="large" />}
            label={wrapAddress(address)}
          />
        ) : (
          <Chip
            size="medium"
            color="secondary"
            icon={<NoAccountsIcon fontSize="large" />}
            label="Not connected"
          />
        )}
      </Tooltip>
      {renderMenu}
    </>
  );
}

export default Account;
