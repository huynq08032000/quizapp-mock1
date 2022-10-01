import { configureStore } from "@reduxjs/toolkit";
import adminQuestionSlice from "./adminQuestionSlice";
import currentQuestionSlice from "./currentQuestionSlice";
import modalSilce from "./modalSilce";
import questionsSlice from "./questionsSlice";
import questionsSubmitSilice from "./questionsSubmitSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer : {
        user : userSlice,
        questions : questionsSlice,
        questionsSubmit : questionsSubmitSilice, 
        questionsAdminSlice : adminQuestionSlice,
        modal : modalSilce,
        currentQuestion : currentQuestionSlice
    }
})

export default store;