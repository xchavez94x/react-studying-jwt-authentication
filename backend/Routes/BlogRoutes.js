const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/isAuth');
const blogController = require('../Controllers/BlogControllers');

router.get('/posts', isAuth , blogController.getBlogPosts);

router.get("/posts/:postId", blogController.getPost)

router.post('/add-post', isAuth, blogController.addPost);

router.patch('/edit-post/:postId', blogController.editPost)

router.delete('/delete-post/:postId', blogController.deletePost);



module.exports = router;