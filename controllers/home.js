const router = require('express').Router();
const {Post, User} = require('../models');
const {isAuth, getUserList} = require('../utils');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include:[{model:User,
            attributes:['username']
            }]
        });
        const userList = await getUserList();
        let posts;

        (allPosts.length > 5) ? posts = allPosts.slice(-5) : posts = allPosts;
        posts = allPosts.map((post) => post.get({ plain: true }));

        for (let i = 0; i < posts.length; i++) {
            posts[i].created_by = userList[posts[i].created_by-1];
        }

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

router.get('/posts', isAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        res.render('allposts', allPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/posts/:id', isAuth, async (req, res) => {
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