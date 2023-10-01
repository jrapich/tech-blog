const router = require('express').Router();
const login = require('./login');
const post = require('./post');

router.use('/auth', login);
router.use('/submit', post);

module.exports = router;