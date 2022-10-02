import { ArrowBack } from "@material-ui/icons";
import { Button, Icon, Typography } from "@mui/material";
import 'antd/dist/antd.css';
import { Input, Image } from 'antd';
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { uploadThumbnailAPI } from "../../../config/API";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../../config/token";
import { toast } from "react-toastify";
import { toastCss } from "../../StyleComponent/StyleCompoent";
import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
    title: yup
        .string("Enter title question")
        .required("Title is required"),
});

const AddQuestionComponent = ({ handleOnSubmit, label, formInit }) => {
    const navigate = useNavigate()
    const [img, setImg] = useState('')
    const formik = useFormik({
        initialValues: {
            title : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAdd(values);
        }
    });
    const myHandleChange = (event) => {
        formik.handleChange(event);
    };
    const handleAdd = async (values) => {
        console.log(values.title)
        console.log(img)
        // const data = await axios.post()
    }
    const handleUploadFile = (e) => {
        toast.info('Uploading', toastCss)
        let formData = new FormData()
        formData.append('thumbnail', e.target.files[0], e.target.files[0].name)
        axios.post(uploadThumbnailAPI, formData, {
            headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`, "Content-Type": "multipart/form-data", }
        }).then(res => {
            setImg(res.data.data)
            toast.success('Upload Success', toastCss)
        }).catch(err => toast.error(err.message, toastCss))
    }
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
                        <Icon><ArrowBack onClick={() => { navigate('/admin') }} /></Icon>
                        <Typography variant="h2" style={{ fontSize: '30px', margin: '0 10px' }}>
                            Create Question
                        </Typography>
                    </div>
                </div>
                <div className="add-component-form" style={{ marginTop: '50px' }}>
                    <Input.TextArea
                        value={formik.values.title}
                        name='title'
                        onChange={myHandleChange}
                        placeholder="Controlled autosize"
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                    />
                    {formik.touched.title && formik.errors.title && <Typography style={{color : 'red'}}>{formik.errors.title}</Typography>}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Image
                            width={400}
                            src={img}
                        />
                    </div>

                    <Input
                        type="file"
                        onChange={handleUploadFile}                    
                    />

                </div>
                <div className="form-submit" style={{ marginTop: '10px' }}>
                    <Button variant="contained" fullWidth onClick={formik.handleSubmit}>Add</Button>
                </div>
            </div>
        </>
    )
}

export default AddQuestionComponent;