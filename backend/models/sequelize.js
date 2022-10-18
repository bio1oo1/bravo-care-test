const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('bravocare_db', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
