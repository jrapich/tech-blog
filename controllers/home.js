const router = require('express').Router();
const { User } = require('../../../../UofU-VIRT-FSF-PT-06-2023-U-LOLC/14-MVC/01-Activities/24-Stu_Auth-Review/Solved/models');
const {Post} = require('../models');
const auth = require('../utils/isAuth');

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
        res.render('post', post)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;