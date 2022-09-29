import { createSlice } from "@reduxjs/toolkit"

const initState = {
    user : {},
    isAuthen : false
}

const userSlice = createSlice({
    name : 'user',
    initialState : initState,
    reducers : {
        setUser : (state, action) => {
            state.user = action.payload
            state.isAuthen = true
            localStorage.setItem('isAuthen', true)
            localStorage.setItem('roles', JSON.stringify(action.payload.roles))
        }
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;