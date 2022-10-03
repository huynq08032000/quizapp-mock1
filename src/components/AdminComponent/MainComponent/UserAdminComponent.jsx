import React from "react";
import HeaderComponent from "../../Header/HeaderComponent";
import ManagementComponent from "../ChildComponent/ManagementComponent";
import UserManagementComponent from "../ChildComponent/UserManagementComponent";

const UserAdminComponent = () => {
    return (
        <>
            <HeaderComponent/>
            <ManagementComponent component={<UserManagementComponent />}/>
        </>
    )
}

export default UserAdminComponent;