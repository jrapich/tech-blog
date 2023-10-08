const router = require('express').Router();
const {Post, Comment} = require('../../models');

router.put('/post/:id', async (req, res) => {
    try {
        const {post_content} = req.body;
        const postUpdate = await Post.update({
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
        let post = await Post.findByPk(req.params.id);

        //trying to check here if the post exists, if not, 404
        //but its currently not working as expected
        // if (post.id !== req.params.id) {
        //     res.status(404).json("ERROR, post not found");
        //     return;
        //  }

        post = await post.get({plain:true});

        if (post.user_id !== req.session.user_id) {
            res.status(401).json({message:"You do not have the permissions to modify this post"});
        return;
        }
        
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