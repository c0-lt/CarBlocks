import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyCars from './MyCars';
import MintCar from './MintCar';
import MyOffers from './MyOffers';
import OffersReceived from './OffersReceived';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pl: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function Account() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
    maxWidth="lg"
    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
  >
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      <Tab label="Mes voitures" {...a11yProps(0)} />
      <Tab label="Déclarer une voiture" {...a11yProps(1)} />
      <Tab label="Mes offres" {...a11yProps(2)} />
      <Tab label="Offres reçues" {...a11yProps(3)} />
    </Tabs>
    <TabPanel value={value} index={0}>
      <MyCars/>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <MintCar/>
    </TabPanel>
    <TabPanel value={value} index={2}>
      <MyOffers/>
    </TabPanel>
    <TabPanel value={value} index={3}>
      <OffersReceived/>
    </TabPanel>
  </Box>
  );
}

export default Account;