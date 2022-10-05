import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { getUserByIdApi, updateUserApi } from "../config/API"
import axiosInstance from "../config/customAxios"
import { ACCESS_TOKEN_KEY } from "../config/token"

const initState = {
    currentUser: {},
    status: false,
    statusUser: false,
    statusDeleteUser: false,
    name: ''
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setRoles: (state, action) => {
            state.currentUser.roles = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.name = action.payload.name
                state.status = false
            })
    }
})
export const fetchUser = createAsyncThunk('user/fetchUser', async (idUser) => {
    try {
        const res = await axiosInstance.get(
            getUserByIdApi + idUser, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
        )
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const { setCurrentUser, setName, setRoles } = currentUserSlice.actions;
export default currentUserSlice.reducer;