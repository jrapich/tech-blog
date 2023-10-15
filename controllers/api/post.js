const router = require('express').Router();
const {Post, Comment} = require('../../models');

//save a new post to the db
router.post('/post', async (req, res) => {
    try {
        const {post_title, post_content} = req.body;
        const user_id = req.session.user_id; 
        const newPost = await Post.create({
            post_title:post_title,
            post_content:post_content,
            user_id:user_id
        });
        res.json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//save a new comment to the db
router.post('/comment', async (req, res) => {
    try {
        const {comment_content, post_id} = req.body;
        const user_id = req.session.user_id;
        const newComment = await Comment.create({
            comment_content:comment_content,
            post_id:post_id,
            user_id:req.session.user_id,
        });
        res.json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;