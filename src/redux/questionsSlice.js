import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { questionsPlayAPI } from "../config/API"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    questions: [],
    status : false, 
    index : 0, 
    number : 0,
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState: initState,
    reducers: {
        setListQuestion: (state, action) => {
            state.questions = action.payload
        },
        setAnswerQuestion : (state, action) => {
            state.questions = state.questions.map(item => {
                if (item.id === action.payload.id) return action.payload
                else return item
            })
        },
        setIndex: (state, action) =>{
            state.index = action.payload
        },
    }, 
    extraReducers : (builder) => {
        builder
            .addCase(fetchQuestions.pending,(state,action)=>{
                state.status = true
            })
            .addCase(fetchQuestions.fulfilled,(state,action)=>{
                state.questions = action.payload.data;
                state.number = action.payload.number
                state.status = false
            })
    }
})

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async (number) => {
    try {
        const res = await axios.get(
            questionsPlayAPI + number, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return {
            data : res.data.data,
            number : number
        }
    } catch (error) {
        console.log(error)
    }
})
export const { setListQuestion, setIndex, setAnswerQuestion} = questionsSlice.actions;
export default questionsSlice.reducer;