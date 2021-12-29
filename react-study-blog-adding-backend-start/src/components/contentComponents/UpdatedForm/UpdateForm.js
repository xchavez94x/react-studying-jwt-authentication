import React, { PureComponent } from "react";
import InputElement from "../../UIElemets/Input/Input";
import Button from "../../UIElemets/Button/Button";
import dataHandler from "../../../axiosService";
import { withRouter } from "react-router";

import styles from "./UpdateForm.css";

class UpdateForm extends PureComponent {
    state = {
        updateFetchedPost: [

        ]
    }

    componentWillMount() {

        console.log("from the update form ", this.props)
        if( this.props.postId ) {
            dataHandler.get("/posts/" + this.props.postId)
                .then( result => {
                    console.log(result)
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            updateFetchedPost: result.data.post
                        }
                        
                    })
                })
        }
        
    }

    changetitleHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            updateFetchedPost: {
                ...prevState.updateFetchedPost,
                title: event.target.value
            }
        }))
    }

    changeContentHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            updateFetchedPost: {
                ...prevState.updateFetchedPost,
                content: event.target.value
            }
        }))
    }

    changeImageHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            updateFetchedPost: {
                ...prevState.updateFetchedPost,
                imagePath: event.target.value
            }
        }))
    }

    submitDataHandler = (e) => {
        e.preventDefault()
        const updatedInfo = {...this.state.updateFetchedPost}
        const data = {
            title: updatedInfo.title,
            content: updatedInfo.content,
            imagePath: updatedInfo.imagePath,
                    }
        dataHandler.patch("edit-post/"+updatedInfo._id, data)
            .then( res => {
                this.props.history.go(0)
            })
        
    }

    render() {
        console.log(this.state)
        return(
            <form method={this.props.method} onChange={(e) => e.preventDefault()} className={styles.Form}>
                {/* { inputs } */}
                <InputElement type="text" label="Title"  name="title" value={this.state.updateFetchedPost.title} change={this.changetitleHandler} />
                <InputElement type="text" label="Content"  name="content" value={this.state.updateFetchedPost.content} change={this.changeContentHandler} />
                <InputElement type="text" label="Image Path"  name="imagePath" value={this.state.updateFetchedPost.imagePath} change={this.changeImageHandler} />

                <Button label="Submit" clicked={this.submitDataHandler} />
            </form>
        )
    }
}

export default withRouter(UpdateForm);