import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThumbnailComponent from "./ThumbnailComponent";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Pagination from "@mui/material/Pagination";
import { Typography } from "@material-ui/core";
import { setIndexQuestionsChecked } from "../../redux/questionsSubmitSlice";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ResultComponent = () => {
    const dispatch = useDispatch()
    const questionsChecked = useSelector(state => state.questionsSubmit.questionsChecked)
    const number = useSelector(state => parseInt(state.questionsSubmit.number))
    const index = useSelector(state => parseInt(state.questionsSubmit.index))
    const score = useSelector(state => state.questionsSubmit.score)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const handleChangeQuestion = (questionNumber) => {
        //update Silce
        dispatch(setIndexQuestionsChecked(questionNumber-1))
    }
    useEffect(() => {
        setCurrentQuestion({...questionsChecked[index]})
    }, [index, questionsChecked])
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h2" component="h2" style={{ fontSize: '30px' }}>
                Total Score {score}
            </Typography>;
            <Typography variant="h2" component="h2" style={{ fontSize: '30px' }}>
                {currentQuestion?.title}
            </Typography>;
            <ThumbnailComponent thumbnailSrc={currentQuestion?.thumbnail_link} />
            <Box sx={{ width: '100%', margin: '50px 0' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        currentQuestion?.answers?.map((item) => {
                            let color = (item.is_correct) ? 'green' : '#fff'
                            if (item.is_submit_correct === false) color = 'red'
                            return (
                                <Grid md={4} sm={6} xs={12} key={item.id}>
                                    <Item style={{backgroundColor : color, color : color === 'red'? 'white' : 'black'}}>{item.content}</Item>
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

export default ResultComponent;