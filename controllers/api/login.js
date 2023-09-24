const router = require('express').Router();
const {User} = require('../../models');
const auth = require('../../utils/isAuth');

router.post('/signup', async () => {
    try {
        let {username, email, password} = req.body;
        if (!username) {
            res.status(418).json({message:'Please enter a username'});
            return;
        }
        if (!email) { 
            res.status(418).json({message:'Please enter an email address'});
            return;
        }
        if (!password) {
            res.status(418).json({message:'Please enter a password'});
            return;
        } 
        username = username.toLowerCase();
        email = email.toLowerCase();
        const newUserData = await User.create({
            username: username,
            email: email,
            password: password
        });
        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.logged_in = true;

            res.json({
                user: userData.username,
                message: `Welcome ${userData.username}! You are now logged in.`
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.user.toLowerCase();
    try {
        const userData = await User.findOne({
            where:{
                username: username
            }
        });
        if (!userData) {
            res.status(400).json({message:'Incorrect email or password, please try again'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message:'Incorrect email or password, please try again'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({
                user: userData.username,
                message: `Welcome ${userData.username}! You are now logged in.`
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/logout', async () => {
    req.session.destroy(() => {
        res.status(204).end();
    })
});

module.exports = router;
