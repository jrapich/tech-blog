const {Model, DataTypes}=require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {

}

Comment.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        comment_content:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:true,
                notNull:true
            }
        },
        post_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'post',
                key:'id'
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
            }
        },
        created_on:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'comment'
    }
);

module.exports = Comment;