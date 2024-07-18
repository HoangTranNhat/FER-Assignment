import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="Footer" sx={{mt:'auto', p:2, backgroundColor: '#f5f5f5'}}>
            <Typography align='center'>© Tháng 6 2024 - Trần Nhật Hoàng - SE171204 - Trial Test - Student Managerment App</Typography>
        </Box>
    );
};

export default Footer;