import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {InjectedConnector} from "wagmi/connectors/injected";

function Address() {

  const {address, isConnected} = useAccount();
  const {connect} = useConnect({
    connector: new InjectedConnector(),
  });
  const {disconnect} = useDisconnect();
  // const { state: { accounts } } = useEth();
  const wrapAddress = (text) => {
    return text.slice(0,6)+"..."+text.slice(-4);
  };
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDisconnect = () => {
    disconnect()
    setAnchorEl(null);
  };

  const handleConnect = () => {
    connect()
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
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isConnected ? (
      <MenuItem onClick={handleDisconnect}>Déconnexion</MenuItem>
      ) : (
      <MenuItem onClick={handleConnect}>Connexion</MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <Tooltip onClick={handleProfileMenuOpen} sx={{ mt: '5px'}} title="My ETH address">
        {isConnected
        ? 
          <Chip size="medium" color="secondary" 
        icon={<AccountCircle fontSize="large" />} 
        label={wrapAddress(address)} />
        :
        <Chip size="medium" color="secondary" 
        icon={<NoAccountsIcon fontSize="large" />} 
        label="Not connected" />
}     
      </Tooltip>
      {renderMenu}
      </>
    );
}

export default Address;