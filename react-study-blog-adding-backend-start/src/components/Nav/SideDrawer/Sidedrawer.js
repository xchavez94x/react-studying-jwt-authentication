import React from "react";
import {Link} from "react-router-dom";

import Style from "./SideDrawer.css";

const Sidedrawer = props => {

    let menu = props.menuItems.map( menuItem => {
        return(
            <li>
                <Link to={menuItem.link}>{menuItem.label}</Link>
            </li>
        )
        
    })
    return(
        
            <ul className={Style.Sidedrawer} style={ props.shown ? {transform: "translateX(0)"} : {transform: "translateX(-150%)"} }>
                {menu}
            </ul>
        
    )
}

export default Sidedrawer;