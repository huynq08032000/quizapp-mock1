import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuestions } from "../../../redux/questionsSlice";
import { submitQuestions } from "../../../redux/questionsSubmitSlice";
import '../css/style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastCss } from "../../StyleComponent/StyleCompoent";
import { Modal } from "antd";


const SubmitButtonComponent = () => {
    const validateSubmit = (questionsSubmit) => {
        const rs = questionsSubmit.map(element => {
            return element.answersSubmittedId.length === 0
        })
        return !rs.includes(true)
    }
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const questions = useSelector(state => state.questions.questions)
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        const questionsSubmit = questions.map(item => {
            return {
                id: item.id,
                answersSubmittedId: item.answersSubmittedId ? item.answersSubmittedId : []
            }
        })

        if (validateSubmit(questionsSubmit)) {
            toast.success('Nộp bài thành công', toastCss)
            dispatch(submitQuestions(questionsSubmit))
            dispatch(resetQuestions())
        } else {
            toast.error("Mỗi câu hỏi cần ít nhất một câu trả lời", toastCss);
        }
        hideModal()
    }
    return (
        <>
            <div className="center">
                <LoadingButton color="primary" variant="contained" type="submit" style={{ margin: '10px' }}
                    onClick={showModal}>Submit</LoadingButton>
            </div>
            <Modal
                title="Modal"
                open={open}
                onOk={handleSubmit}
                onCancel={hideModal}
                okText="Submit"
                cancelText="Cancel"
            >
                <p>Do you really want to submit?</p>
            </Modal>
        </>
    )
}

export default SubmitButtonComponent;