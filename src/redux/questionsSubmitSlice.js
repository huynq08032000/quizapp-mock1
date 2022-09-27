import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { questionsSubmitAPI } from "../config/API"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    questionsChecked: [], 
    loading : false,
    index : 0,
    number : 0,
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
            })
    }
})
export const submitQuestions = createAsyncThunk('questions/submitQuestions', async (questionsSubmit) => {
    try {
        const res = await axios.post(
            questionsSubmitAPI,{listQuestionSubmitted : [...questionsSubmit]} ,{ 
                headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
            }
        )
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const { setquestionsSubmit , resetQuestionSubmit } = questionsSubmitSlice.actions;
export default questionsSubmitSlice.reducer;