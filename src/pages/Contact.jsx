import React from 'react';
import '../styles/contact.css'
import ClassIcon from '@mui/icons-material/Class';
import DetailsIcon from '@mui/icons-material/Details';

const Contact = () => {
    return (
        <div className="contact">
            <p>This is my contact</p>
            <p><ClassIcon /> Class: NJS1804</p>
            <p><DetailsIcon /> Details: Trần Nhật Hoàng - SE171204</p>
        </div>

    );
};

export default Contact;