import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { toastCss } from "../components/StyleComponent/StyleCompoent"
import { deleteQuestionAPI, deleteUserApi, updateQuestionAPI } from "../config/API"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    users: [],
    status: false,
    index: 0,
    total: 0,
    pageSize: 10,
    currentPage: 1,
    order: 'ASC',
    sortField: 'id',
    role1 : '',
    statusUpdateQuestion : false,
    statusDeleteQuestion : false,
    statusDeleteUser : false,
    isDeleteUser : false,
    isDeleteQuestion : false,
}

const userAdminSlice = createSlice({
    name: 'userAdmin',
    initialState: initState,
    reducers: {
        setListUsers: (state, action) => {
            state.users = action.payload
        },
        setCurrentPageUsers: (state, action) => {
            state.currentPage = action.payload
        },
        setOrderUsers: (state, action) => {
            state.order = action.payload
        },
        setSortFieldUsers: (state, action) => {
            state.sortField = action.payload
        },
        setIsDeleteUser : (state, action) => {
            state.isDeleteQuestion = action.payload
        },
        setRole1 : (state, action) => {
            state.role1 = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.result;
                state.total = action.payload.total
                state.totalPages = action.payload.totalPages
                state.currentPage = action.payload.currentPage
                state.status = false
                state.isDeleteUser = false
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
            .addCase(deleteUser.pending, (state, action) => {
                state.statusDeleteUser = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.statusDeleteUser = false
                state.isDeleteUser = true
            })
    }
})

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async (paramsSearch) => {
    try {
        const res = await axios.get(`https://quangnh.xyz/v1/user`, {
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

export const deleteUser = createAsyncThunk('users/deleteUser', async (idUser) => {
    try {
        const res = await axios.delete(deleteUserApi + idUser,{ headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }})
        toast.success(res.data.message, toastCss)
        return idUser
    } catch (err) {
        toast.error('Delete failed', toastCss)
    }
})
export const {setListUsers, setCurrentPageUsers,setOrderUsers,setSortFieldUsers,setIsDeleteUser, setRole1} = userAdminSlice.actions;
export default userAdminSlice.reducer;