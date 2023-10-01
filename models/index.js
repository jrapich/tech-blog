//import our models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//user can have many posts, but a post can only have one user
User.hasMany(Post,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
Post.belongsTo(User);

//a user can have many comments, but a comment can only have one user
User.hasMany(Comment,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
Comment.belongsTo(User);

//A post can have many comments, but a comment can only have one post
Post.hasMany(Comment,{
    onDelete:'CASCADE'
});
Comment.belongsTo(Post);

module.exports = {User, Post, Comment};