const Sequelize = require('sequelize');
const db = require('../config/database');

const Productos = db.define('product',{
    nombre:{
      type:Sequelize.STRING  
    },
    stock:{
        type:Sequelize.INTEGER 
      },
    precio:{
    type:Sequelize.INTEGER  
    }
});

module.exports = Productos;