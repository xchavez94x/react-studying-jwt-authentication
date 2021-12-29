import React from "react";

import styles from "./Modal.css";

const Modal = props => {
    let classes = [styles.Modal]
    if(props.show) {
        classes.push(styles.ShowModal)
        console.log(classes)
    } else {
        classes.pop(styles.ShowModal)
    }
    
    return(
        <div className={classes.join(' ')}  >
            {props.children}
        </div>
    )
}

export default Modal ;