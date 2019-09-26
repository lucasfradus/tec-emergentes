const Sequelize = require('sequelize');

module.exports = new Sequelize('emergentes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });


  //vha3AwSe1uJllg4KTT1a pwd aws

  