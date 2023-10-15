require('dotenv').config();

const Sequelize = require('sequelize');

//this will use the environment variables stored in the .env file to log into the msql database
const sequelize = process.env.MYSQL_URL
  ? new Sequelize(process.env.MYSQL_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      port:3306,
    });

module.exports = sequelize;