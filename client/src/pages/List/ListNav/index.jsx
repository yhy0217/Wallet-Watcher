import React, { useState } from 'react';
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Box, Tabs, Tab, Typography } from '@mui/material';

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
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

export default function ListNav (props) {
    const [currTab, setCurrTab] = React.useState('/expenses');
    const handleChange = (e) => {
      setCurrTab(e.target.getAttribute('href'));
    };
    function a11yProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <Tabs
        orientation="vertical"
        variant="scrollable"
        // value: The value of the currently selected Tab, can be set to false if don't want any tab to be selected
        value={currTab}
        onChange={handleChange}
        aria-label="Vertical-nav-menu"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        >   
            {/* Component prop: Material UI allows you to change the root element that will be rendered via a prop called component. */}
            <Tab label="Expenses" {...a11yProps(0)} to="/expenses" value="/expenses" component={Link} />
            <Tab label="Incomes" {...a11yProps(1)} to="/incomes" value="/incomes" component={Link} />
        </Tabs>
    );
} 