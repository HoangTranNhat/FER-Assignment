import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Home = () => {

    const [students, setStudents] = useState([]);
    const [studentDetail, setStudentDetail] = useState(null);


    const getListStudent = async () => {
        const res = await axios.get("https://6677cc900bd45250561c8c3a.mockapi.io/studentManagement");
        if (res.status === 200) {
            setStudents(res.data);
        }
    }

    useEffect(() => {
        getListStudent();
    }, []);


    const handleView = (students) => {
        setStudentDetail(students);
    }

    const handleClose = () => {
        setStudentDetail(null);
    }


    return (
        <div className="container">
            {students && students.map((students) => (
                <div className="card" key={students.id}>
                    <img src={students.image} alt={students.id} />
                    <h3>{students.name}</h3>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleView(students)}
                    >
                        View Details
                    </Button>
                </div>
            ))}

            {studentDetail && (
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <span className='close' onClick={handleClose}>
                                &times;
                            </span>
                            <img src={studentDetail.image} alt={studentDetail.id} />
                            <h2>ID: {studentDetail.id}</h2>
                            <p>Name: {studentDetail.name}</p>
                            <p>Date_Of_Birth: {studentDetail.dateofbirth}</p>
                            <p>Gender: {String(studentDetail.gender)}</p>
                            <p>Class: {studentDetail.class}</p>
                            <p>Feedback: {String(studentDetail.feedback)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Home;