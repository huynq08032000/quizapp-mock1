import React from "react";
import { NavLink } from "react-router-dom";
import '../css/index.css'
const MenuItem = ({ title, href }) => {
    return (
        <>
            <div className="navbar-children">
                <NavLink href={href} activeClassName="active" className={'nav-link'}>{title}</NavLink>
            </div>
        </>
    )
}

export default MenuItem