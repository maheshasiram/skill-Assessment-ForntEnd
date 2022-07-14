import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserDetails from "./UserDeatils";

function AccessTabs() {
    let activeTab = !sessionStorage.getItem("activeTab") ? '1' : sessionStorage.getItem("activeTab") 
    const [value, setValue] = React.useState(activeTab);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      sessionStorage.setItem("activeTab", newValue)
    };

    return (
        <div className="accessTabs">
           <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User Details" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <UserDetails />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
    </div>
    )
}

export default AccessTabs;



