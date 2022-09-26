import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import TextField from "@material-ui/core/TextField";
import Alert from '@mui/material/Alert';
import { useFormik } from "formik";
import * as yup from "yup";
import { regexEmail } from '../../config/regex';
import LoadingButton from '@mui/lab/LoadingButton';
import { checkCode, forgotApi, loginApi } from '../../config/API';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/customAxios';

const validationSchema = yup.object({
    email: yup
        .string("Enter your phone")
        .matches(regexEmail, "Invalid Email")
        .required("Email is required"),
});

const ForgotPasswordComponent = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ messContent: '', type: '' })
    const paperStyle = {
        height: '50vh',
        maxWidth: 400,
        margin: '20px auto',
        padding: '40px'
    }
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleForgot(values);
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handleForgot = async (form) => {
        setLoading(true)
        try {
            const res = await axios({
                method: 'post',
                url: forgotApi,
                data: {
                    email: form.email,
                }
            })
            const rs = res.data
            if (checkCode(rs.statusCode)) {
                //set message when register success
                setMessage({ ...message, messContent: rs.message, type: 'success' })
            }
        } catch (error) {
            setMessage({ ...message, messContent: error.response.data.message, type: 'error' })
        }
        setLoading(false)
    };
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlined /></Avatar>
                        <Typography variant="h1" style={{ fontSize: '50px' }}>Forgot Password</Typography>
                        {message.messContent &&
                            <Alert severity={message.type} style={{ margin: '10px 0' }}>
                                {message.messContent}
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
                        <LoadingButton color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '10px', marginBottom: '10px' }} loading={loading}>
                            Submit
                        </LoadingButton>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}

export default ForgotPasswordComponent;