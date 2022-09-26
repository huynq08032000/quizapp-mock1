import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import TextField from "@material-ui/core/TextField";
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { useFormik } from "formik";
import * as yup from "yup";
import { regexEmail } from '../../config/regex';
import LoadingButton from '@mui/lab/LoadingButton';
import { checkCode, loginApi } from '../../config/API';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/userSlice';
import axios from '../../config/customAxios';

const validationSchema = yup.object({
    email: yup
        .string("Enter your phone")
        .matches(regexEmail, "Invalid Email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required")
});

const LoginComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const paperStyle = {
        height: '50vh',
        maxWidth: 400,
        margin: '20px auto',
        padding: '40px'
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: true,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleLogin(values);
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handleLogin = async (form) => {
        setLoading(true)
        try {
            const res = await axios({
                method: 'post',
                url: loginApi,
                data: {
                    email: form.email,
                    password: form.password
                }
            })
            const rs = res.data
            if (checkCode(rs.statusCode)) {
                //add userData to redux
                dispatch(setUser(rs.data.user))
                console.log(rs.data.tokens)
                //navigate
                // navigate('/play')
            }
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
        setLoading(false)
    };
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlined /></Avatar>
                        <Typography variant="h1" style={{ fontSize: '50px' }}>Sign In</Typography>
                        {errorMessage &&
                            <Alert severity="error" style={{ margin: '10px 0' }}>
                                {errorMessage}
                            </Alert>
                        }
                    </Grid>
                    <form onSubmit={formik.handleSubmit}>
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name='rememberMe'
                                    color='primary'
                                    checked={formik.values.rememberMe}
                                    onChange={myHandleChange}
                                />
                            }
                            label="Remember me"
                        />
                        <LoadingButton color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '10px', marginBottom: '10px' }} loading={loading}>
                            Sign in
                        </LoadingButton>
                        <Typography>
                            <Link href='/forgot' underline='hover'>
                                Forgot Password?
                            </Link>
                        </Typography>
                        <Typography>
                            Do you have an account?
                            <Link href='/register' underline='hover'>
                                Sign up
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}

export default LoginComponent;