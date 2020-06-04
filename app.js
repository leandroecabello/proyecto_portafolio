'use strict'

let express = require('express')
let bodyParser = require('body-parser')

let app = express()

//cargar archivos rutas
let projectRoutes = require('./routes/project')

//middelware
app.use(bodyParser.urlencoded( { extended:false } ) )
app.use(bodyParser.json())

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // cambiar * por la url que corresponda al subir a producción
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api', projectRoutes)

//exportar
module.exports = app