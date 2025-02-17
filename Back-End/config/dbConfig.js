const { Sequelize } = require('sequelize');
const colors = require('colors');
require('dotenv').config();
 

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER , process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect:  process.env.DIALECT || 'mysql' ,
  logging: false,  
  port: 3306,
  timezone: '+00:00',
});


sequelize 
  .authenticate()
  .then(() => {
    console.log(colors.bgMagenta(`Connected to MySQL ${process.env.DB_NAME} DB successfully `));
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });    
    
module.exports = sequelize;