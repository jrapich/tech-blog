const { User } =  require('../models');
const bcrypt = require('bcrypt');

const hashPass = async (pass) => {
    const hashed = await bcrypt.hash(pass, 10);
    return hashed;
};


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