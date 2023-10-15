const {User} = require('../models');

//function which grabs a list of all users currently in db and returns it
const getUserList = async () =>{
    const userData = await User.findAll();
    const userListData = userData.map((users) => users.get({ plain: true }));
    let userList = [];
    for (let i = 0; i < userListData.length; i++) {
        userList.push(userListData[i].username);
    }
    return userList;
}

module.exports = getUserList;