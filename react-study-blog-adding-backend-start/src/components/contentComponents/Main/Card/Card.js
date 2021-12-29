import React from "react";

import Auxillary from "../../../../containers/Hoc/Auxillary";
import Button from "../../../UIElemets/Button/Button";
import styles from "./Card.css";

const Card = props => {
    return(
        <Auxillary AuxClass={styles.AuxClass}>
            <div>
                <h3> {props.title} </h3>
                <p> {props.description} </p>
            </div>
            <div>
                <img src={props.source} alt="img" />
                <p> {props.price} </p>
            </div>
            <div>
                <Button label= "Buy" />
            </div>
        </Auxillary>
    )
}

export default Card