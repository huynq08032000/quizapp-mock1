import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isOpenUpdate : false,
    isOpenView : false, 
    isOpenDelete : false,
    idQuestion : 0,
    isOpenDeleteUser : false,
    idUser : 0,
}

const modalSlice = createSlice({
    name : 'modal',
    initialState : initState,
    reducers : {
        setIsOpenUpdate : (state, action) => {
            state.isOpenUpdate = action.payload
        },
        setIdQuestion : (state, action) => {
            state.idQuestion = action.payload
        },
        setIsOpenDelete : (state, action) => {
            state.isOpenDelete = action.payload
        },
        setIsOpenDeleteUser: (state, action) =>{
            state.isOpenDeleteUser = action.payload
        },
        setIdUser : (state,action) =>{
            state.idUser = action.payload
        }
    }
})

export const {setIsOpenUpdate, setIdQuestion, setIsOpenDelete,setIsOpenDeleteUser,setIdUser} = modalSlice.actions;
export default modalSlice.reducer;