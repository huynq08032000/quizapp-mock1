import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { toastCss } from "../components/StyleComponent/StyleCompoent"
import { updateQuestionAPI } from "../config/API"
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
    statusUpdateQuestion : false
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
        setSortField: (state, action) => {
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
            .addCase(updateQuestion.pending, (state, action) => {
                state.statusUpdateQuestion = true
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.statusUpdateQuestion = false
                state.questions = state.questions.map(el => {
                    if (el.id === action.payload.id ) return action.payload 
                    return el
                })
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

export const updateQuestion = createAsyncThunk('quesitons/updateQuestion', async (values) => {
    try {
        const data = {
            title : values.title,
            thumbnail_link : values.thumbnail_link
        }
        const res = await axios.patch(
            updateQuestionAPI + values.id, data , { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        toast.success(res.data.message, toastCss)
        return res.data.data
    } catch (error) {
        toast.success('Update failed', toastCss)
    }

})
export const { setListQuestion, setCurrentPage, setOrder, setSortField } = questionsAdminSlice.actions;
export default questionsAdminSlice.reducer;