const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');
const PORT = 5000;
const app = express();




//middleware HBS
app.engine('hbs', exphbs( { 
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  }));
  
app.set( 'view engine', 'hbs' );

// initialise the flash middleware
app.use(flash());

//FLASH messages
  app.use(session({
    secret: 'NAEMETALPRELIOBTNAVRES',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Secure is Recommeneded, However it requires an HTTPS enabled website (SSL Certificate)
        maxAge: 864000000 // 10 Days in miliseconds
    }
  }));


 
//seteo path estatico
app.use(express.static(path.join(__dirname,'public')));


 // parse form data client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//TEST DB
db.authenticate()
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Error Conn'+err))


//Ruta default
app.get('/',(req, res)=>res.redirect('/Productos'));

//Ruta Products
app.use('/Productos', require('./routes/productos'));
//Ruta Products API
app.use('/Productos/_api', require('./routes/Productos_api.js'));


//Ruta Products
app.use('/bondis', require('./routes/bondis'));


app.listen(PORT, console.log('Server running on port '+PORT));