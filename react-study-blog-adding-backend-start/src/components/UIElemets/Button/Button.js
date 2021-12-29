import React from "react";

import style from "./Button.css";

const Button = props => {
    return ( 
        <div className={style.Container}>
            <button className={style.Button} onClick={props.clicked} >{props.label}</button>
        </div>
        )
}

export default Button ;