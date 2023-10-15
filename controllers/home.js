const router = require('express').Router();
const {Post, User, Comment} = require('../models');
//utlity to determine if a user is logged in. if not, redirects them to login page
const {isAuth} = require('../utils');

//TODO: many of these routes need a proper error checking, better error messages, etc

//use some dev variables for debugging purposes tht are specified in environment variables
//especially useful for making sure the routes are sending back the correct stuff
//debugRoutes:true will send back a json version of the object that is being passed to handlebars
//debugRoutes:false will render the pages in handlebars as normal
const devLog = process.env.DEVLOGGING === 'true' ? true : false;
const debugRoutes = process.env.DEBUG_ROUTES === 'true' ? true : false;

//basic homepage route this will grab all posts from the db,reduce that to the five most recent, and render with handlebars 
router.get('/', async (req, res) => {
    try {
        const posts = [];
        let allPosts = await Post.findAll({
            include:{
                model:User,
                attributes :{exclude:['email','password']}
            },
            order:[['created_on', 'DESC']]
        });
        allPosts = allPosts.map((post) => post.get({ plain: true }));

        if (allPosts.length < 5) {
            for (let j = 0; j < allPosts.length; j++) {
                posts.push(allPosts[j]);
            }
        } else {
            for (let j = 0; j < 5; j++) {
                posts.push(allPosts[j]);
            }
        }

        const postObj = {
            posts:posts,
        }
        //if the user is signed in, pass that to handlebars
        //this determines if the logout button/text displays or not
        if (req.session.logged_in) {
            postObj.loggedInUser = req.session.username
        }
        
        debugRoutes ? res.json(postObj) : res.render('home', postObj);
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

//a helper route I was using early on in development to keep track of all posts and their ids
//will return an array that contains each post's id that exists
router.get('/posts/id/all', async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        let posts;
        let postIds = [];
        //(allPosts.length > 5) ? posts = allPosts.slice(-5) : posts = allPosts;
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

//route for all posts. must be logged in to view
//fetches all posts and the users who created them, from the db, renders them with handlebars
router.get('/posts/all', isAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include:{
                model:User,
                attributes :{exclude:['email','password']}
            },
            order:[['created_on', 'DESC']]
        });
        let posts = await allPosts.map( (post) => post.get({ plain: true }));

        const postObj = {
            posts:posts,
            loggedInUser:req.session.username
        }
        debugRoutes ? res.json(postObj) : res.render('home', postObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }  
});

//displays a specific post by id specified in url
//will also send back any comments attached in this post to display under the post content
router.get('/posts/:id', isAuth, async (req, res) => {
    try {
        let post = await Post.findByPk(req.params.id, {
            include:{
                model:User,
                attributes :{exclude:['email','password']}
            }
        });
        post = await post.get({plain:true});

        let comments = await Comment.findAll({
            include:{
                model:User,
                attributes :{exclude:['email','password']}
            },
            where:{post_id:req.params.id},
            order:[['created_on', 'ASC']]
        });
        comments = await comments.map( (comment) => comment.get({ plain: true }));

        

        //need to rework below logic to check if the post exists
        //(!post.id) ? res.status(404).json("ERROR, post not found") : res.render('post', postObj);

        const postObj = {
            post:post,
            loggedInUser:req.session.username,
            comments:comments,
        }
        console.log(postObj.comments);
        debugRoutes ? res.json(postObj) : res.render('post', postObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//route to a page to edit a specific post by id
//must be logged in to work, and is reached from the user dashboard
router.get('/posts/edit/:id', isAuth, async (req, res) => {
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

        const postObj = {
            loggedInUser:req.session.username,
            postID:req.params.id
        } 
         
        debugRoutes ? res.json(postObj) : res.render('modify', postObj);  
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//route to view the user dashboard. must be logged in
//can see all posts you have created here, and add a new one
router.get('/dashboard', isAuth, async (req, res) => {
    try {
        let userPosts;
        const userPostData = await Post.findAll({
            include:{
                model:User,
                attributes :{exclude:['email','password']}
            },
            where:{user_id:req.session.user_id}
        });
        userPosts = await userPostData.map((post) => post.get({ plain: true }));

        const postObj = {
            posts:userPosts,
            loggedInUser:req.session.username,
            dashboard:true
        }
        debugRoutes ? res.json(postObj) : res.render('home', postObj);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//route to redirect anything else not covered here to home
router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;