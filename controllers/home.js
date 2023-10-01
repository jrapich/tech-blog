const router = require('express').Router();
const {Post, User} = require('../models');
const {isAuth, getUserList} = require('../utils');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include:{model:User},
            attributes :{exclude:['password']}
        });
        const userList = await getUserList();
        let posts;

        (allPosts.length > 5) ? posts = allPosts.slice(-5) : posts = allPosts;
        posts = allPosts.map((post) => post.get({ plain: true }));

        for (let i = 0; i < posts.length; i++) {
            posts[i].user_id = userList[posts[i].user_id-1];
        }

        const postObj = {
            posts:posts,
        }
        if (req.session.logged_in) {
            postObj.user = req.session.username
        }
        
        res.render('home', postObj);
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

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/posts/id/all', async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        let posts;
        let postIds = [];
        (allPosts.length > 5) ? posts = allPosts.slice(-5) : posts = allPosts;
        posts = allPosts.map((post) => post.get({ plain: true }));
        for (let i = 0; i < posts.length; i++) {
            postIds.push(posts[i].id);
        }

        res.json(postIds);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/posts/all', isAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include:{model:User},
            attributes :{exclude:['password']}
        });
        let posts = await allPosts.map( (post) => post.get({ plain: true }));
        console.log(posts);
        
        for (let i = 0; i < posts.length; i++) {
            posts[i].user.password = null;
            posts[i].user.email = null;
        }
        //res.json(posts);
        res.render('home', {posts});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    
});

router.get('/posts/:id', isAuth, async (req, res) => {
    try {
        let post = await Post.findByPk(req.params.id, {
            include:[{all:true}],
            attributes:{
                exclude:'password'
            },
        });
        post = await post.get({plain:true});
        (!post.id) ? res.status(404).json("ERROR, post not found") : res.render('post', post);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;