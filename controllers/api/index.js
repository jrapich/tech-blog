const router = require('express').Router();
const login = require('./login');
const post = require('./post');
const modify = require('./modify');

router.use('/auth', login);
router.use('/submit', post);
router.use('/modify', modify);

module.exports = router;