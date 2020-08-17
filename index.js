'use strict'

let mongoose = require('mongoose')
let app = require('./app')
let config = require('./config')


const mongodbUri = config.MONGODB_TEST

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise
mongoose.connect(mongodbUri, 
{   useNewUrlParser:true, 
    useUnifiedTopology: true 
})
    .then( () => {
        console.log('conexion a la bd establecida exitosamente')
        //creación del servidor
        app.listen(config.SERVER_PORT, () => {
            console.log(`servidor corriendo correctamente en el puerto: ${config.SERVER_PORT}`)
        })
    })
    .catch( err => console.log(err))