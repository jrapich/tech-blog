const {Post} = require('../models');

const postData = [
    {
        post_title:'Example Post',
        post_content:`Example Post Content
        
        Content, Images, etc will appear here.`,
        created_by:1
    },
    {
        post_title:'Example Post 2',
        post_content:`Example Post Content
        
        Each Post can have comments attached as well.`,
        created_by:1
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;