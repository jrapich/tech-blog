const {Model, DataTypes}=require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

}

Post.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        post_title:{
            type:DataTypes.TEXT,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true,
                notNull:true
            }
        },
        post_content:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:true,
                notNull:true
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
        modelName:'post'
    }
);

module.exports = Post;