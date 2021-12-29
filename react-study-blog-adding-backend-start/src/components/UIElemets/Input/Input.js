import React from "react";

import style from "./Input.css"

const InputElement = props => {
    return(
        <div className={style.InputField}>
            <label htmlFor={props.name} > { props.label}: {props.ageValue} </label>
            <input
                className={style.Input}
                {...props.config}
                onChange={props.change} />
        </div>
    )
}

export default InputElement