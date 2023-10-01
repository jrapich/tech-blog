const {Comment} = require('../models');

const commentData = [
    {
        comment_content:'comments will appear here',
        parent_post:2,
        user_id:1
    }
];

const seedComments = async () => await Comment.bulkCreate(commentData);

module.exports = seedComments;