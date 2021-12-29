import React,{ Component} from "react";

import Backdrop from "../../UIElemets/Backdrop/Backdrop";
import Styles from "./About.css";
import Modal from "../../UIElemets/Modal/Modal";

class About extends Component {
    
    state = {
        show: false
    }

    showModalHandler = () => {
        const doShow = this.state.show;
        this.setState({ show : !doShow })
        console.log(this.state)
    }
    render() {
        return (
            <div className={Styles.About}>
                <button style={{ width: "150px" }} onClick={this.showModalHandler} >
                    show
                </button >
                <Backdrop show={this.state.show} hideBackdrop={this.showModalHandler} />
                <Modal show={this.state.show} backdropClicked={this.state.show} />
            </div>
                
        )
    }
}

export default About