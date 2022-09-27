import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { questionsSubmitAPI } from "../../config/API";
import { ACCESS_TOKEN_KEY } from "../../config/token";
import './css/style.css'
const SubmitButtonComponent = () => {
    const questions = useSelector(state => state.questions.questions)
    const handleSubmit = async () => {
        const questionsSubmit = questions.map(item => {
            return {
                id: item.id,
                answersSubmittedId: item.answersSubmittedId?item.answersSubmittedId : []
            }
        })
        try {
            const res = await axios.post(
                questionsSubmitAPI,{listQuestionSubmitted : [...questionsSubmit]} ,{ 
                    headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
                }
            )
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }
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