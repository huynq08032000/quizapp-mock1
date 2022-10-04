import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { createAnswerApi, deleteAnswerApi, getQuestionById, getUserByIdApi, updateAnswerApi } from "../config/API"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    currentUser: {},
    status: false,
    statusUser: false,
    statusDeleteUser: false,
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
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
            .addCase(fetchUser.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
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
export const fetchUser = createAsyncThunk('user/fetchUser', async (idUser) => {
    try {
        const res = await axios.get(
            getUserByIdApi + idUser, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})
export const createAnswer = createAsyncThunk('questions/createAnswer', async (data) => {
    try {
        const res = await axios.post(
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
        const res = await axios.patch(
            updateAnswerApi + data.id, tempData, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteAnswer = createAsyncThunk('questions/deleteAnswer', async (id) => {
    try {
        const res = await axios.delete(deleteAnswerApi + id, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
        return id
    } catch (err) {
        console.log(err)
    }
})
export const { setCurrentQuestion, setTitleCurentQuestion, setThumbailCurrentQuestion } = currentUserSlice.actions;
export default currentUserSlice.reducer;