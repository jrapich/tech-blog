const {Comment} = require('../models');

const commentData = [
    {
        comment_content:'comments will appear here',
        parent_post:2,
        created_by:1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;