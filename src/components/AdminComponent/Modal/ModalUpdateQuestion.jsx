import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Input, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenUpdate } from '../../../redux/modalSilce';
import { deleteAnswer, fetchQuestion, setThumbailCurrentQuestion, setTitleCurentQuestion, updateAnswer } from '../../../redux/currentQuestionSlice';
import { toast } from "react-toastify";
import { toastCss } from "../../StyleComponent/StyleCompoent";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { uploadThumbnailAPI } from '../../../config/API';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../config/token';
import { Typography } from "@mui/material";
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import AddAnswerComponent from '../ChildComponent/AddAnswerComponent';
import { updateQuestion } from '../../../redux/adminQuestionSlice';
import axiosInstance from '../../../config/customAxios';

const validationSchema = yup.object({
    title: yup
        .string("Enter title question")
        .required("Title is required"),
});

const ModalUpdateQuestion = () => {
    const dispatch = useDispatch()
    const isModalUpadte = useSelector(state => state.modal.isOpenUpdate)
    const idQuestion = useSelector(state => state.modal.idQuestion)
    const currentQuestion = useSelector(state => state.currentQuestion.currentQuestion)
    const status = useSelector(state => state.currentQuestion.status)
    const statusDeleteAnswer = useSelector(state => state.currentQuestion.statusDeleteAnswer)
    const statusUpdateQuestion = useSelector(state => state.questionsAdminSlice.statusUpdateQuestion)
    const handleOk = () => {
        // dispatch(setIsOpenUpdate(false))
        formik.handleSubmit()
    };
    const handleCancel = () => {
        dispatch(setIsOpenUpdate(false))
    };

    const formik = useFormik({
        initialValues: {
            title: 'Update modal'
        },
        validationSchema: validationSchema, 
        onSubmit: (values) => {
            dispatch(updateQuestion(currentQuestion))
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
        dispatch(setTitleCurentQuestion(event.target.value))
    };

    const handleUploadFile = (e) => {

        toast.info('Uploading', toastCss)
        let formData = new FormData()
        formData.append('thumbnail', e.target.files[0], e.target.files[0].name)
        axiosInstance.post(uploadThumbnailAPI, formData, {
            headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`, "Content-Type": "multipart/form-data", }
        }).then(res => {
            dispatch(setThumbailCurrentQuestion(res.data.data))
            toast.success('Upload Success', toastCss)
        }).catch(err => toast.error(err.message, toastCss))

    }

    const handleCheck = (id, check) => {
        console.log(id, check)
        const data = {id : id, is_correct : !check}
        dispatch(updateAnswer(data))
    }

    useEffect(() => {
        if (idQuestion > 0 && isModalUpadte) {
            dispatch(fetchQuestion(idQuestion))
            formik.setValues(currentQuestion)
            dispatch(setTitleCurentQuestion(currentQuestion.title))
        }
    }, [isModalUpadte])

    const handleDelete = (idAnswer) => {
        dispatch(deleteAnswer(idAnswer))
    }
    return (
        <>
            <Modal title="Update Question Modal" open={isModalUpadte} onOk={handleOk} onCancel={handleCancel} confirmLoading={statusUpdateQuestion}>
                {status ? <LoadingComponent /> : <>
                    <Input.TextArea
                        value={currentQuestion.title}
                        name='title'
                        onChange={myHandleChange}
                        placeholder="Controlled autosize"
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                    />
                    {formik.touched.title && formik.errors.title && <Typography style={{ color: 'red' }}>{formik.errors.title}</Typography>}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Image
                            width={400}
                            src={currentQuestion.thumbnail_link}
                        />
                    </div>

                    <Input
                        type="file"
                        onChange={handleUploadFile}
                    />
                    <Typography style={{ color: 'green' }}>Answers</Typography>
                    {currentQuestion.answers?.map(el => {
                        return (
                            <div key={el.id}>
                                <Button type="primary" icon={<DeleteOutlined />} danger size='small' style={{ marginRight: '20px' }} onClick = {() => handleDelete(el.id)} loading={statusDeleteAnswer}/>                 
                                <FormControlLabel
                                    label={el.content}
                                    control={
                                        <Checkbox
                                            name='rememberMe'
                                            color='primary'
                                            checked={el.is_correct}
                                            onClick={() => handleCheck(el.id, el.is_correct)}
                                        />
                                    }

                                />
                            </div>
                        )
                    })}
                    <AddAnswerComponent idQuestion = {currentQuestion.id} />
                </>}


            </Modal>
        </>
    );
};

export default ModalUpdateQuestion;