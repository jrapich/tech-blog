const {User} = require('../models');

const getUserList = async () =>{
    const userData = await User.findAll({
        attributes:{
            exclude:['password']
        }
    });
    const userListData = userData.map((users) => users.get({ plain: true }));
    let userList = [];
    for (let i = 0; i < userListData.length; i++) {
        userList.push(userListData[i].username);
    }
    return userList;
}

module.exports = getUserList;