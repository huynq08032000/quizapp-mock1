import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isOpenUpdate : false,
    isOpenView : false, 
    isOpenDelete : false,
    idQuestion : 0,
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
        }
    }
})

export const {setIsOpenUpdate, setIdQuestion, setIsOpenDelete} = modalSlice.actions;
export default modalSlice.reducer;