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


module.exports = router;