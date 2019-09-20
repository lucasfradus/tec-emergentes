const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Products = require('../models/Productos');
const { check, validationResult } = require('express-validator');

//guardo las validaciones en un array para llamarlas cuando necesite.
var validaciones = [
    check('nombre').not().isEmpty().withMessage('Completar el nombre'),
    check('precio').not().isEmpty().withMessage('Completar el precio')
        .isInt().withMessage('El Precio debe contener un valor numerico'),
    check('stock').not().isEmpty().withMessage('Completar el stock')
        .isInt().withMessage('El Stock debe contener un valor numerico'),
  ];

/* DELETE de PROD. */
router.get('/delete/:id', function (req, res) {
    Products.findByPk(req.params.id).then(prod =>{
        console.log(prod);
        if (prod){
            req.flash('info', 'Producto eliminado correctamente');
            res.redirect('/Productos');
          }else{
            req.flash('danger', 'Producto no encontrado');
            res.redirect('/Productos');
          }
    }).catch(err =>{
        req.flash('danger', "Error: " + err);
        res.redirect('/Productos');
    })
    });

/* Listado de PROD. */
router.get('/', (req, res) => Products.findAll()
    .then(prod => {
        res.render('products',{
            prod
        })
    }) 
        .catch(err => console.log('Error: ' + err))
);

/* DIsplay de EDITAR PROD. */
router.get('/edit/:id',function(req,res){
    Products.findByPk(req.params.id).then(prod =>{
        if (prod){
            res.render('edit',{prod, errors:req.session.errors, id:req.params.id});
          }else{
            req.flash('danger', 'Producto no encontrado');
            res.redirect('/Productos');
          }
    }).catch(err =>{
        req.flash('danger', "Error: " + err);
        res.redirect('/Productos');
    })
});

/* POST de EDITAR PROD. */
router.post('/edit/:id', validaciones, function(req,res){
      const errors = validationResult(req);
      let id = req.params.id;
      if(!errors.isEmpty()){
        req.flash('danger','Se encontraron errores en el formulario');
        req.session.body=req.body;
        req.session.errors = errors.mapped();
        res.redirect('/Productos/edit/'+ id);
        req.session = null;
      }else{
        Products.findByPk(id).then(prod =>{
            if (prod){
               prod.update({
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    stock : req.body.stock
               }) 
               .then(prod => {
                    req.flash('success', 'Producto actualizado correctamente');
                    res.redirect('/Productos');
                })
               .catch(err => console.log(err));
              }else{
                req.flash('danger', 'Producto no encontrado');
                res.redirect('/Productos');
              }
        })
      }  
});

/* Display de Agregar PROD. */
router.get('/add', function(req, res) {
    res.render('add',  {errors:req.session.errors,body:req.session.body});
    req.session.errors = null;
    req.session.body = null;
  });

/* POST de Agregar PROD. */
router.post('/add', validaciones, (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('danger','Se encontraron errores en el formulario');
        req.session.body=req.body;
        req.session.errors = errors.mapped();
    }else{
        const data = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock : req.body.stock
        }
        let{nombre, precio, stock} = data;
        Products.create({
            nombre,
            precio,
            stock
        })
            .then(prod => flash('success','todo bien'))
            .catch(err => console.log(err));
  }
  res.redirect('/Productos/add');
});


module.exports = router