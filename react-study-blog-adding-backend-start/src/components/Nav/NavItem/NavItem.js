import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = props => {
    return(
        <NavLink activeClassName={props.Active} to={props.link} className={props.Style} >
            {props.label}
        </NavLink>
    )
}

export default NavItem;