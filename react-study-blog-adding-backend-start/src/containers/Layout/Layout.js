import React from "react";

import Style from "./Layout.css"

const Layout = props => {
    return(
        <div className={Style.Layout}>
            {props.children}
        </div>
    )
}

export default Layout