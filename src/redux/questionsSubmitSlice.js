import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { questionsSubmitAPI } from "../config/API"
import axiosInstance from "../config/customAxios"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    questionsChecked: [], 
    loading : false,
    index : 0,
    number : 0,
    score : 0
}

const questionsSubmitSlice = createSlice({
    name: 'questionsSubmit',
    initialState: initState,
    reducers: {
        setquestionsSubmit: (state, action) => {
            state.questionsChecked = action.payload
        }, 
        resetQuestionSubmit: (state,action) => {
            state.questionsChecked = []
            state.loading = false
            state.index = 0
            state.number = 0
            state.score = 0
        },
        setIndexQuestionsChecked: (state, action) => {
            state.index = action.payload
        }
    }, 
    extraReducers : (builder) => {
        builder
            .addCase(submitQuestions.pending,(state,action)=>{
                state.status = true
            })
            .addCase(submitQuestions.fulfilled,(state,action)=>{
                state.questionsChecked = action.payload.listQuestionChecked;
                state.status = false
                state.number = action.payload.listQuestionChecked.length
                state.score = action.payload.totalScore
            })
    }
})
export const submitQuestions = createAsyncThunk('questions/submitQuestions', async (questionsSubmit) => {
    try {
        const res = await axiosInstance.post(
            questionsSubmitAPI,{listQuestionSubmitted : [...questionsSubmit]} ,{ 
                headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
            }
        )
        return res.data.data
    } catch (error) {
        console.log(error)
        return {}
    }
})

export const { setquestionsSubmit , resetQuestionSubmit, setIndexQuestionsChecked} = questionsSubmitSlice.actions;
export default questionsSubmitSlice.reducer;