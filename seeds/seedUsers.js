const { User } =  require('../models');
const bcrypt = require('bcrypt');

//function for using bcrypt hashing
const hashPass = async (pass) => {
    const hashed = await bcrypt.hash(pass, 10);
    return hashed;
};

//this function will seed db with some users, and hash their passwords first before sending to server
//for some reason seeding users this way doesnt hash the passwords in the db, have to do it here first
const seedUsers = async () => {
    const hashed = await hashPass('01234567890');
    
    const userData = [
        {
            username:'admin',
            email:'admin@fakeemail.com',
            password: hashed
        }
    ];
    
    await User.bulkCreate(userData);
}


module.exports = seedUsers;