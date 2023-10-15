const router = require('express').Router();
const login = require('./login');
const post = require('./post');
const modify = require('./modify');
//middleware check to make sure user is logged in, otherwise, cant access API
const {isAuthApi} = require('../../utils');

//currently the api are only accessed from pages only reachable if logged in
//some of these check for a user_id in the session which only exists if a user is logged in
//but overall better checks is needed against arbitrary http requests to this api
//especially against trying to modify/delete other users posts/comments/etcgit s

//route to handle all login/signup requests
router.use('/auth', login);
//handles all post/comment submissions
router.use('/submit', isAuthApi, post);
//handles all modification requests to posts/comments
router.use('/modify', isAuthApi, modify);

module.exports = router;