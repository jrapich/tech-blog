const router = require('express').Router();
const {Post} = require('../models');

router.get('/', async (req, res) => {

    try {
        //get a list of all posts and show the 5 most recent
        //only show the post titles, no comments as we aren't checking if the user is logged in yet
        const allPosts = await Post.findAll();
        let posts;
        (allPosts.length > 5) ? posts = allPosts.slice(-5) : posts = allPosts;
        res.render('homepage', posts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

});

module.exports = router;