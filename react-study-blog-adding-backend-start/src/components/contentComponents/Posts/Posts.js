import React, { Component } from "react";
import dataHandler from "../../../axiosService";
import { connect } from "react-redux"; 
import axios from "axios";

import { showModal, hideModal } from "../../../store/actions/postsActions";

import SinglePost from "./SinglePost/SinglePost";
import Style from "./Posts.css"
import Button from "../../UIElemets/Button/Button";
import Modal from "../../UIElemets/Modal/Modal";
import Backdrop from "../../UIElemets/Backdrop/Backdrop";
import Form from "../Form/Form";
import Post from "./Post/Post";
import UpdateForm from "../UpdatedForm/UpdateForm";

class Posts extends Component {

    state = {
        fetchedPosts: [],
        fetchedSinglePost: [],
        showModal: false,
        showPost: false, 
        editPost: false, 
        postId: null, 
        token: ""
    }

    componentWillMount() {
        dataHandler.get('/posts')
            .then( result => {
                console.log(result)
                this.setState({ fetchedPosts: result.data.posts, token: localStorage.token })
            })
            .catch( err => {
                console.log( err )
            })
        
    }

    showFormHandler = () => {
        this.setState({ showModal: true })
    }

    hideModalHandler = () => {
        this.setState({ showModal: false, showPost: false })
    }

    checkPostHandler = (id) => {
        console.log(id)
        const doShow = this.state.showPost
        this.setState({showPost: !doShow})
        dataHandler.get( "/posts/"+id )
            .then( fetchedPost => {
                console.log([fetchedPost.data.post])
                this.setState({ fetchedSinglePost: [fetchedPost.data.post]})
            })
    }

    deletePostHandler = (id) => {
        
        dataHandler.delete("/delete-post/"+id)
        .then( result  => {
            const posts = [...this.state.fetchedPosts]
            const updPost = posts.filter( post => {
            return post._id !== id
        })
        this.setState({fetchedPosts: updPost})
        })
        .catch( err => {
            console.log(err)
        })
    }

    showEditFormHandler = (id) => {
        this.setState({ editPost: true, postId: id })
    }

    hideEditFormHandler = () => {
        this.setState( {
            editPost: false  
        })
    }

    logoutHandlder = () => {
        localStorage.removeItem('token');
        this.props.history.go('/')
        this.setState({ token: "" })
    }


    render() {
        //!  add posts from 
        let form = (
            <div>
                <Backdrop show={this.props.showModal} hideBackdrop={this.props.onHideModal}>
                </Backdrop>
                <Modal show={this.props.showModal} >
                    <Form />
                </Modal>
            </div>
            
        )

        //! editing a post form 

        let editForm = (
            <div>
                <Backdrop show={this.state.editPost} hideBackdrop={this.hideEditFormHandler}>
                </Backdrop>
                <Modal show={this.state.editPost} >
                    <UpdateForm method="POST" postId={this.state.postId} />
                </Modal>
            </div>
            
        )
        //!  posts list 

        let posts = null

        if(this.state.fetchedPosts.length === 0) {
            posts =  <h1 style={{ marginTop: "24px" }}> no posts in db </h1>;
        } else {
            posts = this.state.fetchedPosts.map( (post) => {
                return ( 
                    <div className={Style.PostContainer}>
                        <SinglePost post = {post} updatePostClicked={() => this.showEditFormHandler(post._id)} />
                        <div className={Style.ButtonsContainer}>
                            <Button label="check post" clicked={() => this.checkPostHandler(post._id)} />
                            <Button label="delete post" clicked={() => this.deletePostHandler(post._id)} />
                        </div>
                    </div>
                )
            })
        }
        
        //!single post 
        let singlePost = (
            <div>
                <Backdrop show={this.state.showPost} hideBackdrop={this.hideModalHandler}>
                </Backdrop>
                <Modal show={this.state.showPost}  >
                    <Post fetchedPost={this.state.fetchedSinglePost}  />
                </Modal>
            </div>
        )
        let buttonsSection ;
        if(this.state.token ) {
            buttonsSection = (
                    <div className={Style.InnerSection}>
                        <Button label="Add a post" clicked={this.props.onShowModal} />
                        <Button label="Logout" clicked={this.logoutHandlder} />
                    </div>
            )
        }
        
        return(
            <div className={Style.Posts}>
                <div className={Style.SectionOne}>
                    <h1>
                        Posts page 
                    </h1>
                    
                    {buttonsSection}
                </div>
                { this.props.showModal ? form : null }
                { this.state.showPost ? singlePost : null}
                { this.state.editPost ? editForm : null  }
                <div>
                    {posts}
                </div>
            </div>
            
        )
    }
    
}

const mapStateToProps = state => {
    return {
        showModal: state.showModal
    }
}

const dispatchActions = dispatch => {
    return {
        onShowModal: () => dispatch(showModal()),
        onHideModal: () => dispatch(hideModal())
    }
}

export default connect(mapStateToProps, dispatchActions)(Posts);