import { ArrowBack } from "@material-ui/icons";
import { Button, Icon, Typography } from "@mui/material";
import 'antd/dist/antd.css';
import { Cascader, Input } from 'antd';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../../config/token";
import { toast } from "react-toastify";
import { toastCss } from "../../StyleComponent/StyleCompoent";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { useFormik } from "formik";
import { regexEmail } from "../../../config/regex";
import { createNewUserApi } from "../../../config/API";
import { optionsRole } from "../../../ultis/ultis";
import axiosInstance from "../../../config/customAxios";

const styleInput = {
    marginTop: '10px',
    width: '100%'
}

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
        .oneOf([yup.ref('password'), null], 'Password must match')
});

const AddUserComponent = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAdd(values);
        }
    });
    const [rolesValues, setRolesValue] = useState([['user']])
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handleAdd = async (values) => {
        let roleSubmit = []
        if (rolesValues.length < 1) {
            toast.warning('Roles must contain at least 1 elements', toastCss)
            return
        }
        if (rolesValues.length === 1) {
            roleSubmit = [...rolesValues[0]]
        } else {
            rolesValues.forEach(el => {
                roleSubmit.push(el[0])
            })
        }
        const data = {
            email: values.email,
            name: values.name,
            password: values.password,
            roles: roleSubmit
        }
        setLoading(true)
        try {
            const res = await axiosInstance.post(createNewUserApi, data, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`
                }
            })
            toast.success(res.data.message, toastCss)
            formik.resetForm()
            
        } catch (err) {
            toast.error(err.response.data.message, toastCss)
        }
        setLoading(false)
    }
    const onChange = (value) => {
        setRolesValue(value)
    };
    return (
        <>
            <div
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 360
                }}
            >
                <div className="header">
                    <div className="header-title" style={{ display: 'flex' }}>
                        <Icon><ArrowBack onClick={() => { navigate('/admin/users') }} /></Icon>
                        <Typography variant="h2" style={{ fontSize: '30px', margin: '0 10px' }}>
                            Create User
                        </Typography>
                    </div>
                </div>
                <div className="add-component-form" style={{ marginTop: '50px' }}>
                    <form>
                        <Input
                            id="name"
                            name="name"
                            label="Name"
                            placeholder="Enter name"
                            value={formik.values.name}
                            onChange={myHandleChange}
                            style={styleInput}
                        />
                        {formik.touched.name && formik.errors.name && <Typography style={{ color: 'red' }}>{formik.errors.name}</Typography>}
                        <Input
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Enter email"
                            value={formik.values.email}
                            onChange={myHandleChange}
                            style={styleInput}
                        />
                        {formik.touched.email && formik.errors.email && <Typography style={{ color: 'red' }}>{formik.errors.email}</Typography>}
                        <Input
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={myHandleChange}
                            style={styleInput}
                        />
                        {formik.touched.password && formik.errors.password && <Typography style={{ color: 'red' }}>{formik.errors.password}</Typography>}
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Enter confirm password"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={myHandleChange}
                            style={styleInput}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <Typography style={{ color: 'red' }}>{formik.errors.confirmPassword}</Typography>}
                        <Cascader
                            name="roles"
                            style={styleInput}
                            placeholder='Roles'
                            options={optionsRole}
                            onChange={onChange}
                            multiple
                            maxTagCount="responsive"
                            defaultValue={['user']}
                        />
                    </form>
                </div>
                <div className="form-submit" style={{ marginTop: '10px' }}>
                    <LoadingButton variant="contained" fullWidth onClick={formik.handleSubmit} loading={loading}>Add</LoadingButton>
                </div>
            </div>
        </>
    )
}

export default AddUserComponent;