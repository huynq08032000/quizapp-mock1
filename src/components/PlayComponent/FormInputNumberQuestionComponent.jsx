import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config, questionsPlayAPI } from "../../config/API";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../config/token";

const validationSchema = yup.object({
    number: yup
        .string("Enter number of questions")
        .matches(`^[0-9]*[1-9][0-9]*$`, 'Invalid number')
        .required("Number of questions is required"),
});

const FormInputNumberQuestionComponent = () => {
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            number: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handlePlay(values);
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handlePlay = async (values) => {
        setLoading(true)
        try {
            const res = await axios.get(
                questionsPlayAPI + values.number,{ headers: {"Authorization" : `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`} }
            )
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    return (
        <>
            <Grid align={'center'} >
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Input number of questions"
                        variant="filled"
                        sx={{ width: '50%' }}
                        id="number"
                        name="number"
                        value={formik.values.number}
                        onChange={myHandleChange}
                        error={formik.touched.number && Boolean(formik.errors.number)}
                        helperText={formik.touched.number && formik.errors.number} />
                    <LoadingButton color="primary" variant="contained" type="submit" style={{ margin: '10px' }} loading={loading} >
                        Play
                    </LoadingButton>
                </form>
            </Grid>
        </>
    )
}

export default FormInputNumberQuestionComponent;