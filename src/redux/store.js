import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./questionsSlice";
import questionsSubmitSilice from "./questionsSubmitSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer : {
        user : userSlice,
        questions : questionsSlice,
        questionsSubmit : questionsSubmitSilice
    }
})

export default store;