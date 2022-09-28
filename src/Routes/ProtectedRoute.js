import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../config/token";
import { numInArray } from "../ultis/ultis";

const ProtectedRoute = ({ children, role }) => {
    const userRoles = useSelector(state => state.user.user?.roles)
    const isAuthen = useSelector(state => state.user.isAuthen)

    const funCheck = (arr1, arr2) => {
        const rs = arr1.map((el) => {
            return numInArray(el, arr2)
        })
        return numInArray(true, rs)
    }
    if (!isAuthen) {
        return <Navigate to="/login" replace />;
    } else {
        console.log(role)
        console.log(userRoles)
       if (!funCheck(userRoles, role)) return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;