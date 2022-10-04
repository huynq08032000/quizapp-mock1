import React from "react";
import HeaderComponent from "../../Header/HeaderComponent";
import AddUserComponent from "../ChildComponent/AddUserComponent";
import ManagementComponent from "../ChildComponent/ManagementComponent";

const AdminAddUserComponent = ({ }) => {

    return (
        <>
            <HeaderComponent />
            <ManagementComponent component={<AddUserComponent/>} />
        </>
    )
}

export default AdminAddUserComponent;