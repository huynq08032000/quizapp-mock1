import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { createAnswerApi, deleteAnswerApi, getQuestionById, updateAnswerApi } from "../config/API"
import axiosInstance from "../config/customAxios"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    currentQuestion: {},
    status: false,
    statusAnswer: false,
    statusDeleteAnswer: false,
}

const currentQuestionSlice = createSlice({
    name: 'currentQuestion',
    initialState: initState,
    reducers: {
        setCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload
        },
        setTitleCurentQuestion: (state, action) => {
            state.currentQuestion.title = action.payload
        },
        setThumbailCurrentQuestion: (state, action) => {
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
            .addCase(createAnswer.pending, (state, action) => {
                state.statusAnswer = true
            })
            .addCase(createAnswer.fulfilled, (state, action) => {
                state.statusAnswer = false
                state.currentQuestion.answers.push(action.payload)
            })
            .addCase(updateAnswer.fulfilled, (state, action) => {
                state.currentQuestion.answers = state.currentQuestion.answers.map((el) => {
                    if (el.id === action.payload.id) return action.payload
                    else return el
                })
            })
            .addCase(deleteAnswer.pending, (state, action) => {
                state.statusDeleteAnswer = true
            })
            .addCase(deleteAnswer.fulfilled, (state, action) => {
                state.statusDeleteAnswer = false
                state.currentQuestion.answers = state.currentQuestion.answers.filter(el => el.id !== action.payload)
            })
    }
})
export const fetchQuestion = createAsyncThunk('questions/fetchQuestion', async (idQuestion) => {
    try {
        const res = await axiosInstance.get(
            getQuestionById + idQuestion, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})
export const createAnswer = createAsyncThunk('questions/createAnswer', async (data) => {
    try {
        const res = await axiosInstance.post(
            createAnswerApi, data, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return {
            id: res.data.data.id,
            content: data.content,
            is_correct: data.is_correct
        }
    } catch (error) {
        console.log(error)
    }
})

export const updateAnswer = createAsyncThunk('questions/updateAnswer', async (data) => {
    try {
        const tempData = { is_correct: data.is_correct }
        const res = await axiosInstance.patch(
            updateAnswerApi + data.id, tempData, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteAnswer = createAsyncThunk('questions/deleteAnswer', async (id) => {
    try {
        const res = await axiosInstance.delete(deleteAnswerApi + id, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
        return id
    } catch (err) {
        console.log(err)
    }
})
export const { setCurrentQuestion, setTitleCurentQuestion, setThumbailCurrentQuestion } = currentQuestionSlice.actions;
export default currentQuestionSlice.reducer;