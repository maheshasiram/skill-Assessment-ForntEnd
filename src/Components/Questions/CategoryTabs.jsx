import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import QuestionCategory from './Questions';

function CategoryTabs(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <div>
                   <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="React" value="1" />
            <Tab label="Go" value="2" />
            <Tab label="java Script" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><QuestionCategory /></TabPanel>
        <TabPanel value="2">Go</TabPanel>
        <TabPanel value="3">java Script</TabPanel>
      </TabContext>
    </Box>
            
        </div>
    );
}

export default CategoryTabs;