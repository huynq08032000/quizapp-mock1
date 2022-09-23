import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "../components/LoginComponent/LoginComponent";
import ROUTES from "../config/ROUTES";

const Routing = () => {
    return (
        <Router>
            <Routes>
                {ROUTES.map((route, index) => <Route key={index} path={route.path} element={route.component} />)}
                <Route path="/" element={<LoginComponent/>}/>
                <Route path='*' element={<>404 Error</>} />
            </Routes>
        </Router>
    )
}
export default Routing;