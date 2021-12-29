const Blog = require('../Models/BlogModel')
const Users = require('../Models/UserModel');
const jwt = require('jsonwebtoken')

exports.getBlogPosts = (req, res, next) => {
    
    console.log(req.userId)
    Blog.find({ creator: req.userId })
    .then( result => {
        res.status(200).json({
            posts: result
        })
    })
    .catch( err => {
        const error = new Error( err );
        error.statusCode = 500;
        res.json({
            error: error
        })
    })
}

exports.addPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const imagePath = req.body.imagePath;
    console.log("userId", req.userId)

    const post = new Blog({
        title: title,
        content: content,
        imagePath: imagePath,
        creator: req.userId
    })

    Users.findOne({ email: req.email })
    .then( user => {
        user.posts.push(post)
        return user.save()
    })
    .then( result => {
        return post.save()
    })
    .then( result => {
        res.json({
            message: "Post was saved"
        })
    })
    .catch( err => {
        const error = new Error( err );
        error.statusCode = 500;
        console.log(error)
        res.json({
            error: error
        })
    })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Blog.findById(postId)
        .then( post => {
            res.status(200).json({
                post: post
            })
        })
        .catch( err => {
            const error = new Error( " post was not found" );
            error.statusCode = 500;
            console.log(error)
            res.json({
                error: error
            })
        })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;

    Blog.findByIdAndDelete(postId)
        .then( result => {
            console.log(result)
            res.status(200).json({
                message: "Post deleted"
            })
        })
        .catch( err => {
            const error = new Error( " post was not deleted" );
            error.statusCode = 500;
            console.log(error)
            res.json({
                error: error
            })
        })
}

exports.editPost = (req, res, next) => {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    const imagePath = req.body.imagePath;
    // console.log(title, content, imagePath)

    Blog.findById(postId)
        .then( post => {
            if(!post) {
                res.status(404).json({
                    message: "post was not found"
                })
            }
            console.log(post)
                post.title = title;
                post.content = content;
                post.imagePath = imagePath;
                post.save()
                    .then( result => {
                        console.log(result)
                        res.status(200).json({
                            message: "post was updated successfully"
                        })
            
                    })
        })
        
        .catch( err => {
            const error = new Error( " post was not updated" );
            error.statusCode = 500;
            console.log(err)
            res.json({
                error: error
            })
        })
}