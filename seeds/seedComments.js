const {Comment} = require('../models');

//basic comment data to seed
const commentData = [
    {
        comment_content:'comments will appear here',
        post_id:2,
        user_id:1
    }
];

const seedComments = async () => await Comment.bulkCreate(commentData);

module.exports = seedComments;