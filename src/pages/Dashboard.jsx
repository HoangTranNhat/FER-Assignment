import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../styles/dashboard.css';


const Dashboard = () => {

    const [student, setStudent] = useState([]);

    const getListStudent = async () => {
        const res = await axios.get(`https://6677cc900bd45250561c8c3a.mockapi.io/studentManagement`);
        if (res.status === 200) {
            setStudent(res.data);
        }
    }

    useEffect(() => {
        getListStudent();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleDelete = async (id) => {
        const res = await axios.delete(`https://6677cc900bd45250561c8c3a.mockapi.io/studentManagement/${id}`);
        if (res.status === 200) {
            getListStudent();
            toast.success("Deleted Successfully ~");
        } else {
            toast.error("Delete: Error!");
        }
        handleClose();
    }
    const handleClickOpen = (id) => {
        setOpen(true);
        setStudent(id - 1);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="student-table" >
            <div className="btn-add">
                <Link to={'/add/'}>
                    <button className='add-student-btn'>+ Add new student</button>
                </Link>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date Of Birth</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Image</th>
                        <th>Feedback</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(student) && student.length > 0 ? (
                    student.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.dateofbirth}</td>
                            <td>{String(student.gender)}</td>
                            <td>{student.class}</td>
                            <td><img src={student.image} alt={student.id} /></td>
                            <td>{student.feedback}</td>
                            <td>
                                <Link to={`/update/${student.id}`}><button>Edit</button></Link>
                                <button className="delete-btn" onClick={() => handleClickOpen(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : null}
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete Student?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete a student? {student}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(student)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default Dashboard;