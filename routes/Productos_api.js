const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Products = require('../models/Productos');
const { check, validationResult } = require('express-validator');


/* Listado de todos los PROD. */
router.get('/Get', (req, res) => Products.findAll()
    .then(prod => {
        res.send(prod) ;     
    }) 
        .catch(err => console.log('Error: ' + err))
);

/* Listado de PROD. */
router.get('/Get/:id', (req, res) => Products.findByPk(req.params.id)
    .then(prod => {
      if (prod){
        res.send(prod)
      }else{
        res.send("Producto no encontrado")
      }
        
    }) 
        .catch(err => console.log('Error: ' + err))
);



module.exports = router