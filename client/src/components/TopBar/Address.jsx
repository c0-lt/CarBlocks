import useEth from "../../contexts/EthContext/useEth";
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Address() {
  const { state: { accounts } } = useEth();

  return (
      <Tooltip sx={{ mt: '5px'}} title="My ETH address">
        <Chip size="medium" color="secondary" icon={<AccountCircle fontSize="large" />} label={accounts && accounts[0] && accounts[0]} />
      </Tooltip>
    );
}

export default Address;