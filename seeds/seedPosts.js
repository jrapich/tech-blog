const {Post} = require('../models');

//basic post data to seed
const postData = [
    {
        post_title:'Example Post',
        post_content:`Example Post Content
        
        Content, Images, etc will appear here.`,
        user_id:1
    },
    {
        post_title:'Example Post 2',
        post_content:`Example Post Content
        
        Each Post can have comments attached as well.`,
        user_id:1
    }
];

const seedPosts = async () => await Post.bulkCreate(postData);

module.exports = seedPosts;