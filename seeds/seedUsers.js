const {User} =  require('../models');

const userData = [
    {
        username:'admin',
        email:'admin@fakeemail.com',
        password:'123456789'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;