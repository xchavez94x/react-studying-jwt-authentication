import React, { Component} from "react";
import axios from "axios";
import { withRouter } from "react-router-dom"


import InputElement from "../../UIElemets/Input/Input";
import Button from "../../UIElemets/Button/Button";
import style  from "./RegistrationForm.css";

class RegForm extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    state={
        inputs: {
            fullName: {
                type: "text",
                name: "fullName",
                value: "",
                label: "Full name"
            },
            email: {
                type: "email",
                name: "email",
                value: "",
                label: "Email address"
            },
            password: {
                type: "password",
                name: "password",
                value: "",
                label: "Password"
            },
            confirmPassword: {
                type: "password",
                name: "confirmPassword",
                value: "",
                label: "Repeat password"
            },
            age: {
                type: "range",
                name: "age",
                min: 18,
                max: 100,
                value: "",
                label: "Age"
            },
        }
    }

    changeInputHandler = (event, identifier) => {
        event.preventDefault();
        const updatedFormInputs = {...this.state.inputs}
        const updatedFormElement = {
            ...updatedFormInputs[identifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormInputs[identifier] = updatedFormElement 
        this.setState({ inputs: updatedFormInputs })
    }

    submitFormHandler = (e) => {
        e.preventDefault()
        let data = {}
        Object.values(this.state.inputs).map( input => {
            return data[input.name] = input.value
        })
        console.log(data)
        axios.post('http://localhost:8080/blog/register', data)
            .then( result => {
                console.log(result)
                this.props.history.replace('/login')
            })
            .catch( err => console.log( err ))
    }

    render() {
        let formInputs = Object.values(this.state.inputs).map(input => {
            return <InputElement 
                key={input.name} 
                for={input.name } 
                label={input.label} 
                config={input} 
                change={(event)=> this.changeInputHandler(event, input.name)}
                ageValue={ input.name === "age" ? input.value : "" }
            />
        });
        return(
            <div>
                <form method="POST" noValidate className={style.Form}>
                    {formInputs}
                    <Button label="Submit" clicked={(e) => this.submitFormHandler(e)}/>
                </form>
            </div>
        )
    }
}

export default withRouter(RegForm)