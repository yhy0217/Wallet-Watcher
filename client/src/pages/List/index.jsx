import React from 'react';
import ListNav from './ListNav';
import ListDemo from './ListDemo';
import { Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';

export default function List () {
    return (
        <React.Fragment>
            {/* apply slots */}
            <Grid container spacing={2} sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '90vh', mt: '1ch' }}>
                <Grid item xs={2} label="nav">
                    <ListNav />
                </Grid>
                <Grid item xs={10} label="demo">
                    <Routes>
                        <Route path="/expenses" element={<ListDemo />} />
                        <Route path="/incomes" element={<ListDemo />} />
                    </Routes>         
                </Grid>
            </Grid>
        </React.Fragment>
    )
} 