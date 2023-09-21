const seedUsers = require('./seedUsers');
const seedPosts = require('./seedPosts');
const seedComments = require('./seedComments');
const sequelize = require('../config/connection');

const seedAllTheThings = async () => {
    await sequelize.sync({force:true});
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USER DATA SYNCED -----\n');
    await seedPosts();
    console.log('\n----- POST DATA SYNCED -----\n');
    await seedComments();
    console.log('\n----- COMMENT DATA SYNCED -----\n');
    process.exit();
};

seedAllTheThings();