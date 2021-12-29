import React from "react";
import { withRouter } from "react-router";

import Style from "./SinglePost.css";
import Button from "../../../UIElemets/Button/Button";

const SinglePost = props => {

    let fetchedPost = props.post;
        return(
            <div className={Style.SinglePost} >
                <h2>{ fetchedPost.title }</h2>
                <p>
                    {fetchedPost.content}
                </p>
                <Button label="Update" clicked={ props.updatePostClicked }/>
            </div>
        )
    
}

export default withRouter(SinglePost);