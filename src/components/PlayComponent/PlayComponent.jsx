import React from "react";
import { useSelector } from "react-redux";
import HeaderComponent from "../Header/HeaderComponent";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormInputNumberQuestionComponent from "./FormInputNumberQuestionComponent";
import QuestionComponent from "./QuestionComponent";
import SubmitButtonComponent from "./SubmitButtonComponent";
import ResultComponent from "./ResultComponent";

const PlayComponent = () => {
    // const user = useSelector(state => state.user.user)
    // console.log(user)
    const number = useSelector(state => parseInt(state.questions.number))
    const numberQuestionChecked = useSelector(state => state.questionsSubmit.number)
    return (
        <>
            <HeaderComponent />
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ boxShadow: '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)', height: 'auto', marginTop: '30px', padding: '20px' }} >
                    {number > 0 ?
                        <>
                            <QuestionComponent />
                            <SubmitButtonComponent />
                        </> : <><FormInputNumberQuestionComponent /></>
                    }
                    {
                        numberQuestionChecked > 0 ?
                            <ResultComponent/> : <></>
                    }
                </Box>
            </Container>
        </>
    )
}

export default PlayComponent