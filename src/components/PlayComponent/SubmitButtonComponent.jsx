import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionsSubmitAPI } from "../../config/API";
import { ACCESS_TOKEN_KEY } from "../../config/token";
import { resetQuestions } from "../../redux/questionsSlice";
import { submitQuestions } from "../../redux/questionsSubmitSlice";
import './css/style.css'
const SubmitButtonComponent = () => {
    const questions = useSelector(state => state.questions.questions)
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        const questionsSubmit = questions.map(item => {
            return {
                id: item.id,
                answersSubmittedId: item.answersSubmittedId?item.answersSubmittedId : []
            }
        })
        dispatch(submitQuestions(questionsSubmit))
        dispatch(resetQuestions())
    }

    return (
        <>
            <div className="center">
                <LoadingButton color="primary" variant="contained" type="submit" style={{ margin: '10px' }}
                    onClick={handleSubmit}
                >Submit</LoadingButton>
            </div>

        </>
    )
}

export default SubmitButtonComponent;