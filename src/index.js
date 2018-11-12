const express = require('express');
const morgan = require('morgan');
const path = require('path');


const app = express();

// Settings
app.set('port', process.env.PORT || 3000); 

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // Metodo de Express. Envia y recibe datos en nuestro servidor en formato JSON. Antes se instalaba con un módulo llamado body-parser, ahora lo trae express

// Routes
app.use('/api/products', require('./routes/products.routes'));

// Static files
app.use(express.static(path.join(__dirname,'public')));


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});