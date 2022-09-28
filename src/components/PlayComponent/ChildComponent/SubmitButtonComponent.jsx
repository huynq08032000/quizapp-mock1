import { LoadingButton } from "@mui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuestions } from "../../../redux/questionsSlice";
import { submitQuestions } from "../../../redux/questionsSubmitSlice";
import '../css/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastCss } from "../../StyleComponent/StyleCompoent";


const SubmitButtonComponent = () => {
    const validateSubmit = (questionsSubmit) => {
        const rs = questionsSubmit.map(element => {
            return element.answersSubmittedId.length === 0
        })
        return !rs.includes(true)
    }

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
    }
    return (
        <>
            <div className="center">
                <LoadingButton color="primary" variant="contained" type="submit" style={{ margin: '10px' }}
                    onClick={handleSubmit}>Submit</LoadingButton>
            </div>           
        </>
    )
}

export default SubmitButtonComponent;