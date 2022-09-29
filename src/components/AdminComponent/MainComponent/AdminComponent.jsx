import React from "react";
import HeaderComponent from "../../Header/HeaderComponent";
import ManagementComponent from "../ChildComponent/ManagementComponent";
import QuestionsManagementCompoent from "../ChildComponent/QuestionsManagementComponent";

const AdminComponent = () => {
    return (
        <>
            <HeaderComponent/>
            <ManagementComponent component={<QuestionsManagementCompoent />}/>
        </>
    )
}

export default AdminComponent;