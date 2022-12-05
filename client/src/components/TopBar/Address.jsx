import useEth from "../../contexts/EthContext/useEth";
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Address() {
  // const { state: { accounts } } = useEth();
  const { address, isConnected } = useAccount();


  return (
      <Tooltip sx={{ mt: '5px'}} title="My ETH address">
        {isConnected
        ? 
          <Chip size="medium" color="secondary" 
        icon={<AccountCircle fontSize="large" />} 
        label={address} />
        :
        <Chip size="medium" color="secondary" 
        icon={<NoAccountsIcon fontSize="large" />} 
        label="Not connected" />
}
      </Tooltip>
    );
}

export default Address;