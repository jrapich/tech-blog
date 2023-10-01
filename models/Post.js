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
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true,
                isAlphanumeric:true,
                notNull:true
            }
        },
        post_content:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
                isAlphanumeric:true,
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