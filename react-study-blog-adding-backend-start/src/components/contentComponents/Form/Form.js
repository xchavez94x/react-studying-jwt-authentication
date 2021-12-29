import React, { PureComponent } from "react";
import InputElement from "../../UIElemets/Input/Input";
import Button from "../../UIElemets/Button/Button";
import dataHandler from "../../../axiosService";
import { withRouter, NavLink } from "react-router-dom";

import styles from "./Form.css";

class Form extends PureComponent {
    state = {
        inputs: {
            title: {
                label: "title",
                type: "text",
                placeholder: "enter the title",
                name: "title",
                value: ""
            },
            content: {
                label: "Content",
                type: "text",
                placeholder: "enter the content",
                name: "content",
                value: ""
            },
            imagePath: {
                label: "Image",
                type: "text",
                placeholder: "enter the image",
                name: "imagePath",
                value: ""
            }
        }
        , 
        updateFetchedPost: [

        ]
    }

    componentDidMount() {
        console.log("from the form ", this.props.postId)
        if( this.props.postId ) {
            dataHandler.get("/posts/" + this.props.postId)
                .then( result => {
                    console.log(result)
                    this.setState({ updateFetchedPost: result.data.post })
                })
        }
        console.log(this.state)
    }

    changeInputHandler = (e, id) => {
        e.preventDefault();
        const updatedInputsValue = { ...this.state.inputs };
        
        let updatedEl = updatedInputsValue[id];

        updatedEl.value = e.target.value
        // console.log(updatedEl)
        updatedInputsValue[id] = updatedEl
        this.setState({ inputs: updatedInputsValue })
        console.log(this.state.inputs)
    }

    submitDataHandler = (e) => {
        e.preventDefault()
        const data = {
            title: this.state.inputs.title.value,
            content: this.state.inputs.content.value,
            imagePath: this.state.inputs.imagePath.value

        }
        dataHandler.post('/add-post', data)
        .then( result => {
            console.log(result)
            
        })
        console.log("data is ",this.props)
    }

    render() {
        let inputs = Object.values(this.state.inputs).map( (input, index) => {
            return (
                <InputElement 
                    key={index}
                    label={input.label}
                    name={input.name} 
                    htmlFor={input.name}
                    placeholder={input.placeholder}
                    value={this.props.postId? this.state.updateFetchedPost[input.name] : input.value}
                    type={input.type}
                    change={(e) => this.changeInputHandler(e, input.name)}
                />
            )
        })
        return(
            <form method={this.props.method} onChange={(e) => e.preventDefault()} className={styles.Form}>
                { inputs }
                <Button label="Submit" clicked={this.submitDataHandler} />
            </form>
        )
    }
}

export default withRouter(Form);