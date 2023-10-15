const router = require('express').Router();
const home = require('./home');
const api = require('./api');

//api route
router.use('/api', api);
//main route
router.use('/', home);


module.exports = router;