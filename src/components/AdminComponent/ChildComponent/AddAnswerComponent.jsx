import React, { useState } from "react";
import { Button, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import 'antd/dist/antd.css';
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createAnswer } from "../../../redux/currentQuestionSlice";

const validationSchema = yup.object({
    title: yup
        .string("Enter answer")
        .required("Answer is required"),
});

const AddAnswerComponent = ({ idQuestion }) => {
    const dispatch = useDispatch()
    const [check, setCheck] = useState(false)
    const statusAnswer = useSelector(state => state.currentQuestion.statusAnswer)
    const handleAdd = (values) => {
        const data = {
            content : values.title,
            questionId : idQuestion,
            is_correct : check
        }
        dispatch(createAnswer(data))
        setCheck(false)
        formik.resetForm()
    }

    const handleCheck = () => {
        setCheck(!check)
    }
    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAdd(values);
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} size='small' style={{ marginRight: '20px' }} onClick={formik.handleSubmit} loading={statusAnswer} />
            <FormControlLabel
                control={
                    <Checkbox
                        name='rememberMe'
                        color='primary'
                        checked={check}
                        onChange={handleCheck}
                    />
                }
                style={{ marginRight: 0 }}
            />
            <Input placeholder="Add answer" style={{ width: '75%' }} name='title' onChange={myHandleChange} value={formik.values.title} />
            {formik.touched.title && formik.errors.title && <Typography style={{ color: 'red' }}>{formik.errors.title}</Typography>}
        </>
    )
}

export default AddAnswerComponent;