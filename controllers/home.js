const router = require('express').Router();
const {Post} = require('../models');
const auth = require('../utils/isAuth');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        let posts;
        (allPosts.length > 5) ? posts = allPosts.slice(-5) : posts = allPosts;
        posts = allPosts.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render('home', {posts});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/posts', auth, async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        res.render('allposts', allPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include:[{all:true}]
        });
        (!post) ? res.status(404).json("ERROR, post not found") : res.render('post', post);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;