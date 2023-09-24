const router = require('express').Router();
const login = require('./login');

router.use('/auth', login);

module.exports = router;