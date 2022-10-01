import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isOpenUpdate : false,
    isOpenView : false, 
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
        }
    }
})

export const {setIsOpenUpdate, setIdQuestion} = modalSlice.actions;
export default modalSlice.reducer;