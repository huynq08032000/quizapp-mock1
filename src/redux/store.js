import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./questionsSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer : {
        user : userSlice,
        questions : questionsSlice
    }
})

export default store;