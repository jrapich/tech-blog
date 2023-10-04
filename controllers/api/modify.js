const router = require('express').Router();
const {Post, Comment} = require('../../models');

router.put('/post/:id', async (req, res) => {
    try {
        const {post_title, post_content} = req.body;
        const postUpdate = await Post.update({
            post_title:post_title,
            post_content:post_content,
        }, 
        {where:{id:req.params.id}
        });
        res.json(postUpdate);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/comment/:id', async (req, res) => {
    try {
        const {comment_content} = req.body;
        const commentUpdate = await Comment.update({
            comment_content:comment_content
        }, 
        {where:{id:req.params.id}
        });
        res.json(commentUpdate);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/post/:id', async (req, res) => {
    try {
        
        const postDestroy = await Post.destroy(
            {where:{id:req.params.id}});

        res.json(postDestroy);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/comment/:id', async (req, res) => {
    try {
        
        const commentDestroy = await Comment.update(
        {where:{id:req.params.id}
        });

        res.json(commentDestroy);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;