import React, { useState } from 'react';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { regexEmail } from '../../config/regex';
import LoadingButton from '@mui/lab/LoadingButton';
import { checkCode, forgotApi } from '../../config/API';
import axios from '../../config/customAxios';
import { paperStyle, toastCss } from '../StyleComponent/StyleCompoent';
import { toast } from 'react-toastify';
import { Link } from '@mui/material';

const validationSchema = yup.object({
    email: yup
        .string("Enter your phone")
        .matches(regexEmail, "Invalid Email")
        .required("Email is required"),
});

const ForgotPasswordComponent = () => {
    const [loading, setLoading] = useState(false)
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
                toast.success(rs.message, toastCss)
            }
        } catch (error) {
            toast.error(error.response.data.message, toastCss)
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

export default ForgotPasswordComponent;