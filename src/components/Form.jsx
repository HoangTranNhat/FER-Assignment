import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/form.css';

const URL = 'https://6677cc900bd45250561c8c3a.mockapi.io/studentManagement';

const initialState = {
    name: '',
    dateofbirth: '',
    gender: '',
    class: '',
    image: '',
    feedback: '',
    createdAt: Math.floor(Date.now() / 1000)
}

const error_init = {
    name_err: '',
    dateofbirth_err: '',
    gender_err: '',
    class_err: '',
    image_err: '',
    feedback_err: ''
}

const FormAddEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState(initialState);
    const { name, dateofbirth, gender, class: className, image, feedback } = state;
    const [errors, setErrors] = useState(error_init);

    const getOneStudent = async (id) => {
        const res = await axios.get(`${URL}/${id}`);
        if (res.status === 200) {
            setState(res.data);
        }
    }

    useEffect(() => {
        if (id) getOneStudent(id);
    }, [id]);

    const updateStudent = async (studentID, data) => {
        const res = await axios.put(`${URL}/${studentID}`, data);
        if (res.status === 200) {
            toast.success(`Updated student with ID: ${studentID} successfully ~`);
            navigate('/dashboard');
        }
    }

    const addNewStudent = async (data) => {
        const res = await axios.post(`${URL}`, data);
        if (res.status === 200 || res.status === 201) {
            toast.success("New student has been added successfully ~");
            navigate('/dashboard');
        }
    }

    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (name.trim() === '' || name.length < 2) {
            errors.name_err = 'Name is Required';
            if (name.length < 2) {
                errors.name_err = 'Name must be more than 2 characters';
            }
            isValid = false;
        }

        if (dateofbirth.trim() === '') {
            errors.dateofbirth_err = 'Date of Birth is Required';
            isValid = false;
        }

        if (gender.trim() === '') {
            errors.gender_err = 'Gender is Required';
            isValid = false;
        }

        if (className.trim() === '') {
            errors.class_err = 'Class is Required';
            isValid = false;
        }

        if (!image || typeof image !== 'string' || image.trim() === '') {
            errors.image_err = 'Image is Required';
            isValid = false;
        }

        if (feedback.trim() === '') {
            errors.feedback_err = 'Feedback is Required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setState({ ...state, image: file ? file.name : '' });
    // }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!id) {
                addNewStudent(state);
            } else {
                updateStudent(id, state);
            }
        }
    }

    return (
        <div className='form'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1>Student Profile</h1>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name='name' value={state.name} onChange={handleInputChange} />
                        {errors.name_err && <span className='error'>{errors.name_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="dateofbirth">Date of Birth: </label>
                        <input type="date" name='dateofbirth' value={state.dateofbirth} onChange={handleInputChange} />
                        {errors.dateofbirth_err && <span className='error'>{errors.dateofbirth_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="gender">Gender: </label>
                        <div className="radio-buttons">
                            <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="true" 
                                checked={state.gender === 'true'} 
                                onChange={handleInputChange} 
                            />
                                Male
                            </label>
                            <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="false" 
                                checked={state.gender === 'false'} 
                                onChange={handleInputChange} 
                            />
                                Female
                            </label>
                        </div>
                        {errors.gender_err && <span className='error'>{errors.gender_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="class">Class: </label>
                        <input type="text" name='class' value={state.class} onChange={handleInputChange} />
                        {errors.class_err && <span className='error'>{errors.class_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="image">Image: </label>
                        <input type="text" name='image' onChange={handleInputChange} />
                        {errors.image_err && <span className='error'>{errors.image_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="feedback">Feedback: </label>
                        <textarea name='feedback' value={state.feedback} onChange={handleInputChange} />
                        {errors.feedback_err && <span className='error'>{errors.feedback_err}</span>}
                    </div>
                    <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button>
                </form>
            </div>
        </div>
    );
};

export default FormAddEdit;
