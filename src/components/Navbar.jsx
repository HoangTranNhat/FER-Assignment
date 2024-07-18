import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
    return (
        <AppBar position='static' sx={{ backgroundColor: '#787FF6' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ marginRight: 1 }} />
                    <Typography variant='h6' component="div">
                        Student Management App
                    </Typography>
                </Link>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Button
                        color='inherit'
                        component={RouterLink}
                        to="/"
                        sx={{ bgcolor: '#B39DDB', '&:hover': { bgcolor: '#9575CD' }, marginRight: '10px' }}
                    >
                        <HomeIcon sx={{ marginRight: 1 }} />
                        Home
                    </Button>
                    <Button
                        color='inherit'
                        component={RouterLink}
                        to="/dashboard"
                        sx={{ bgcolor: '#FFAB91', '&:hover': { bgcolor: '#FF8A65' }, marginRight: '10px' }}
                    >
                        <DashboardIcon sx={{ marginRight: 1 }} />
                        Dashboard
                    </Button>
                    <Button
                        color='inherit'
                        component={RouterLink}
                        to="/contact"
                        sx={{ bgcolor: '#80CBC4', '&:hover': { bgcolor: '#4DB6AC' }, marginRight: '10px' }}
                    >
                        <ContactMailIcon sx={{ marginRight: 1 }} />
                        Contact
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
