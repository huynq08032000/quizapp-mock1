import React from "react";
import HeaderComponent from "../../Header/HeaderComponent";
import AddQuestionComponent from "../ChildComponent/AddQuestionComponent";
import ManagementComponent from "../ChildComponent/ManagementComponent";

const AdminAddQuestionComponent = () => {

    return (
        <>
            <HeaderComponent />
            <ManagementComponent component={<AddQuestionComponent />} />
        </>
    )
}

export default AdminAddQuestionComponent;