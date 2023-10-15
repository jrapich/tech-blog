const router = require('express').Router();
const login = require('./login');
const post = require('./post');
const modify = require('./modify');

//currently there is no auth check against these api calls
//but currently they are only accessed from pages only reachable if logged in
//some of these check for a user_id in the session which only exists if a user is logged in
//but overall better checks is needed against arbitrary http requests to this api

//route to handle all login/signup requests
router.use('/auth', login);
//handles all post/comment submissions
router.use('/submit', post);
//handles all modification requests to posts/comments
router.use('/modify', modify);

module.exports = router;