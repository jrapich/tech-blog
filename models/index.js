//import our models
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//A post can have many comments, but a comment can only have one post
Post.hasMany(Comment,{
    onDelete:'CASCADE'
});
Comment.belongsTo(Post);

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