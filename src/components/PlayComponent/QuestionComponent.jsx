import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThumbnailComponent from "./ThumbnailComponent";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Pagination from "@mui/material/Pagination";
import { setAnswerQuestion, setIndex } from "../../redux/questionsSlice";
import { numInArray, setColor } from "../../ultis/ultis";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const QuestionComponent = () => {
    const dispatch = useDispatch()
    const listQuestion = useSelector(state => state.questions.questions)
    const number = useSelector(state => parseInt(state.questions.number))
    const index = useSelector(state => parseInt(state.questions.index))
    const [currentQuestion, setCurrentQuestion] = useState({})

    const handleChangeQuestion = (questionNumber) => {
        //update Silce
        dispatch(setIndex(questionNumber - 1))
    }
    const handleAnswer = (answerId) => {
        let tempArrSubmit = [...currentQuestion.answersSubmittedId]
        if (numInArray(answerId, tempArrSubmit)) {
            tempArrSubmit = tempArrSubmit.filter((el) => el !== answerId)
        } else {
            tempArrSubmit.push(answerId)
        }
        const tempQuestion = {
            ...currentQuestion,
            answersSubmittedId: [...tempArrSubmit]
        }
        dispatch(setAnswerQuestion({...tempQuestion}))
    }

    useEffect(() => {
        if (listQuestion[index]?.answersSubmittedId){
            setCurrentQuestion({ ...listQuestion[index]})           
        } else {
            setCurrentQuestion({ ...listQuestion[index], answersSubmittedId: [] })
        }        
    }, [index, listQuestion])
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h2" component="h2" style={{ fontSize: '30px' }}>
                {currentQuestion?.title}
            </Typography>;
            <ThumbnailComponent thumbnailSrc={currentQuestion?.thumbnail_link} />
            <Box sx={{ width: '100%', margin: '50px 0' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        currentQuestion?.answers?.map((item) => {
                            const color = setColor(item.id, currentQuestion.answersSubmittedId)
                            return (
                                <Grid md={4} sm={6} xs={12} key={item.id}>
                                    <Item style={{ backgroundColor: `${color}` }} onClick={() => { handleAnswer(item.id) }} >{item.content}</Item>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
            <Pagination
                count={number}
                color="primary"
                defaultPage={1}
                onChange={(event, pageNumber) => {
                    handleChangeQuestion(pageNumber)
                }}
                style={{ display: 'flex', justifyContent: 'center' }}
            />
        </div>
    )
}

export default QuestionComponent;