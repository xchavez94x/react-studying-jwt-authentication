import React from "react";

import Styles from "./Backdrop.css";

const Backdrop = props => {
    let classes = [ Styles.Backdrop ]

    if(props.show) {
        classes.push(Styles.ShowBackdrop)
        // console.log(classes)
    }
    return(
        <div className={classes.join(' ')} onClick={props.hideBackdrop}>
            {props.children}
        </div>
    )
}

export default Backdrop;