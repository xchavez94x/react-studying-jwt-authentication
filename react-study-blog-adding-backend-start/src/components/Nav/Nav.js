import React from "react";

import Style from "./Nav.css";
import BurgerMenu from "../UIElemets/Icons/menu.svg";
import NavItem from "./NavItem/NavItem";

const Nav = props => {
    let navItems = props.navItems.map( navItem => {
        return (
            <li key={navItem.key}>
                <NavItem  Style={Style.Link} Active={Style.active} label={navItem.label} link={navItem.link} />
            </li>
        )
    })

    return(
        <div className={Style.Nav}>
            <div className={Style.Logo}>
                Logo
            </div>
            <div className={Style.LinksBlock}>
                <ul>
                    { navItems }
                    
                </ul>
                
            </div>
            <div className={Style.MobileMenu} onClick={props.clicked}>
                <img src={BurgerMenu} style={{width: "30px" }} alt="Burger"  />
            </div>

            
        </div>
    )
}

export default Nav;