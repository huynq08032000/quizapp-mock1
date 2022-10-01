import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../config/token";
import { numInArray } from "../ultis/ultis";

const ProtectedRoute = ({ children, role }) => {
    const userRoles = JSON.parse(localStorage.getItem('roles'))
    const isAuthen = Boolean(localStorage.getItem('isAuthen'))
    const funCheck = (arr1, arr2) => {
        if (arr1) {
            const rs = arr1?.map((el) => {
                return numInArray(el, [...arr2])
            })
            return numInArray(true, rs)
        }
        return false
    }

    if (!isAuthen) {
        return <Navigate to="/login" replace />;
    } 
    else {
        if (!funCheck(userRoles, role)) return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;