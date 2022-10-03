import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { getQuestionById } from "../config/API"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    currentQuestion: {},
    status: false,
}

const currentQuestionSlice = createSlice({
    name: 'currentQuestion',
    initialState: initState,
    reducers: {
        setCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload
        }, 
        setTitleCurentQuestion : (state, action) => {
            state.currentQuestion.title = action.payload
        }, 
        setThumbailCurrentQuestion : (state, action) => {
            state.currentQuestion.thumbnail_link = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestion.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchQuestion.fulfilled, (state, action) => {
                state.currentQuestion = action.payload;
                state.status = false
            })
    }
})
export const fetchQuestion = createAsyncThunk('questions/fetchQuestion', async (idQuestion) => {
    try {
        const res = await axios.get(
            getQuestionById + idQuestion, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return res.data.data 
    } catch (error) {
        console.log(error)
    }
})
export const { setCurrentQuestion , setTitleCurentQuestion, setThumbailCurrentQuestion} = currentQuestionSlice.actions;
export default currentQuestionSlice.reducer;