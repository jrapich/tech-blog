const router = require('express').Router();
const auth = require('../../utils/isAuth');

router.get('/', async (req, res) => {
    res.render('homepage');
});

module.exports = router;
