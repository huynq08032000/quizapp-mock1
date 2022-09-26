import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import TextField from "@material-ui/core/TextField";
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { useFormik } from "formik";
import * as yup from "yup";
import { regexEmail } from '../../config/regex';
import LoadingButton from '@mui/lab/LoadingButton';
import { checkCode, registerApi, sucessCode } from '../../config/API';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Your name is required'),
    email: yup
        .string("Enter your phone")
        .matches(regexEmail, "Invalid Email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    confirmPassword: yup
        .string('Enter your confirm password')
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const RegisterComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({messContent : '', type : ''})
    const paperStyle = {
        height: '60vh',
        maxWidth: 400,
        margin: '20px auto',
        padding: '40px'
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: "",
            password: "",
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleRegister(values);
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handleRegister = async (form) => {
        setLoading(true)
        try {
            const res = await axios({
                method: 'post',
                url: registerApi,
                data: {
                    email: form.email,
                    name : form.name,
                    password: form.password
                }
            })
            const rs = res.data
            if (checkCode(rs.statusCode)) {
                //set message when register success
                setMessage({...message , messContent : rs.message , type : 'success' })
            }
        } catch (error) {
            setMessage({...message , messContent : error.response.data.message , type : 'error' })
        }
        setLoading(false)
    };
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlined /></Avatar>
                        <Typography variant="h1" style={{ fontSize: '50px' }}>Sign Up</Typography>
                        {message.messContent &&
                            <Alert severity={message.type} style={{ margin: '10px 0' }}>
                                {message.messContent}
                            </Alert>
                        }
                    </Grid>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={myHandleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={myHandleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={myHandleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={myHandleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <LoadingButton color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '10px', marginBottom: '10px' }} loading={loading}>
                            Sign up
                        </LoadingButton>
                        <Typography>
                            Do you have an account?
                            <Link href='/login' underline='hover'>
                                Sign in
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}

export default RegisterComponent;