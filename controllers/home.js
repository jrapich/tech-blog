const router = require('express').Router();
const {Post, User} = require('../models');
const {isAuth} = require('../utils');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include:{model:User},
            attributes :{exclude:['password']}
        });
        let posts;

        (allPosts.length > 5) ? posts = allPosts.slice(-5) : posts = allPosts;
        posts = await allPosts.map((post) => post.get({ plain: true }));
        for (let i = 0; i < posts.length; i++) {
            posts[i].user.password = null;
            posts[i].user.email = null;
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
        
        for (let i = 0; i < posts.length; i++) {
            posts[i].user.password = null;
            posts[i].user.email = null;
        }

        const postObj = {
            posts:posts,
            user:req.session.username
        }
        //res.json(posts);
        res.render('home', postObj);
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

router.get('/dashboard', isAuth, async (req, res) => {
    try {
        let userPosts;
        const userPostData = await Post.findAll({
            include:{model:User},
            where:{user_id:req.session.user_id}
        });
        userPosts = await userPostData.map((post) => post.get({ plain: true }));
        
        for (let i = 0; i < userPosts.length; i++) {
            userPosts[i].user.password = null;
            userPosts[i].user.email = null;
        }

        const postObj = {
            posts:userPosts,
            user:req.session.username,
            dashboard:true
        }
        res.render('home', postObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;