import React from "react";
import TextField from '@mui/material/TextField';
import { Grid } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../redux/questionsSlice";
import { resetQuestionSubmit } from "../../redux/questionsSubmitSlice";

const validationSchema = yup.object({
    number: yup
        .string("Enter number of questions")
        .matches(`^[0-9]*[1-9][0-9]*$`, 'Invalid number')
        .required("Number of questions is required"),
});

const FormInputNumberQuestionComponent = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.questions.status)
    const formik = useFormik({
        initialValues: {
            number: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handlePlay(values);
            formik.resetForm()
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handlePlay = async (values) => {
        dispatch(fetchQuestions(values.number))
        dispatch(resetQuestionSubmit())
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
                    <LoadingButton color="primary" variant="contained" type="submit" style={{ margin: '10px' }} loading={loading}>
                        Play
                    </LoadingButton>
                </form>
            </Grid>
        </>
    )
}

export default FormInputNumberQuestionComponent;