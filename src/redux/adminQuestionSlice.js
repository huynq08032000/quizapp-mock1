import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    questions: [],
    status: false,
    index: 0,
    total: 0,
    pageSize: 10,
    currentPage: 1,
    order: 'ASC',
    sortField: 'id',
}

const questionsAdminSlice = createSlice({
    name: 'questionsAdmin',
    initialState: initState,
    reducers: {
        setListQuestion: (state, action) => {
            state.questions = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }, 
        setOrder: (state, action) => {
            state.order = action.payload
        }, 
        setSortField : (state, action) => {
            state.sortField = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuestions.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllQuestions.fulfilled, (state, action) => {
                state.questions = action.payload.result;
                state.total = action.payload.total
                state.totalPages = action.payload.totalPages
                state.currentPage = action.payload.currentPage
                state.status = false
            })
    }
})

export const fetchAllQuestions = createAsyncThunk('questions/fetchAllQuestions', async (paramsSearch) => {
    try {
        const res = await axios.get(`https://quangnh.xyz/v1/questions`, {
            params: paramsSearch,
            headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }
        })
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})
export const { setListQuestion, setCurrentPage, setOrder, setSortField } = questionsAdminSlice.actions;
export default questionsAdminSlice.reducer;