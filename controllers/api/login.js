const router = require('express').Router();
const {User} = require('../../models');
const {getUserList} = require('../../utils');

//api route to sign up a new user
//checks for correct username, email, password usage before saving to db
router.post('/signup', async (req, res) => {
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
            res.status(418).json({message:'Please enter a valid password'});
            return;
        }
        if (password.length < 8) {
            res.status(418).json({message:'Please enter a password longer than 8 characters'});
            return;
        }
        //make email/username lowercase for simplicity 
        username = username.toLowerCase();
        email = email.toLowerCase();

        const userList = await getUserList();
        const checkUserList = user =>  {
            return user === username;
        } 
        //checking against the userList helper to make sure the username being created doesn't already exist in db
        const userCheck = userList.find(checkUserList);
        if (userCheck === username) {
            res.status(409).json({message:'the username already exists'});
            return;
        };

        const newUserData = await User.create({
            username: username,
            email: email,
            password: password
        });
        //save the new user data to session
        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.username = newUserData.username;
            req.session.logged_in = true;

            res.json({
                user: newUserData.username,
                message: `Welcome ${newUserData.username}! You are now logged in.`
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//route to handle the login of current users
//checks if the username exists or password is correct before3 
router.post('/login', async (req, res) => {
    try {
        const username = req.body.username.toLowerCase();
        const userData = await User.findOne({
            where:{
                username: username
            }
        });
        if (!userData) {
            res.status(400).json({message:'Incorrect email or password, please try again'});
            return;
        }
        //using a bcrypt function from the User model to make sure the password hash meets the hashed password in db
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message:'Incorrect email or password, please try again'});
            return;
        }
        //if no errors, save to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
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

//logs out the current user by destroying the session
router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.status(204).redirect('/');
    });
});

module.exports = router;