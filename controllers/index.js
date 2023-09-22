const router = require('express').Router();
const home = require('./home');
const api = require('./api');

router.use('/api', api);
router.use('*', home);


module.exports = router;