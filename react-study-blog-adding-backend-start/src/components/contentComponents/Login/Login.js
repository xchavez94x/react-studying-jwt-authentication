import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom"

import InputElement from "../../UIElemets/Input/Input";
import Button from "../../UIElemets/Button/Button";
import styles from "./Login.css";


class Login extends React.Component {

    state = {
        config:{
            email: {
                label: "Email",
                name: "email",
                type: "email",
                value: ""           
            },         
            password: {
                label: "Password",
                name: "password",
                type: "password",
                value: ""           
            }}
    }

    changeInputHandler = (e, identifier ) => {
            e.preventDefault()
            const updatedInput = {...this.state.config};
            const singleUpdatedInput = updatedInput[identifier]
            singleUpdatedInput.value = e.target.value
            updatedInput[identifier] = singleUpdatedInput;
            this.setState({ config: updatedInput })
        }

    loginHandler = (e) => {
        e.preventDefault()
        let loginData = {};
        let copiedState = {...this.state.config};
        for(let id in copiedState) {
            loginData[id] = copiedState[id].value
        }
        axios.post('http://localhost:8080/blog/login', loginData)
            .then( result =>{
                console.log("loggedin")
                const token = result.data.token;
                window.localStorage.setItem("token", token)
                this.props.history.push('/')
            })

    }


    render() {
        let renderedInputs = Object.values(this.state.config).map( input => {
                return ( <InputElement 
                            key={input.name} 
                            label={input.label} 
                            config={input} 
                            change={ (e) => this.changeInputHandler(e, input.name)} />)
            })


            return (
                <div className={styles.Container} >
                    <form method="POST" onSubmit={(e) => e.preventDefault()}>
                        {renderedInputs}
                        <Button label="Login" clicked={(e) => this.loginHandler(e)} />
                    </form>
                </div>
            )
    }

}

export default withRouter(Login);