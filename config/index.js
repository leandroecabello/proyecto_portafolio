const config = {
    // port = 3700
    SERVER_PORT: process.env.PORT || 3700,
    /* MONGODB_URI: `mongodb+srv://${config.DDBB.USER}:${config.DDBB.PASS}@cluster0-zpknf.mongodb.net/
    ${config.DDBB.NAME}?retryWrites=true&w=majority` */
    /* url test -> mongodb://localhost:27017/Portafolio */
    MONGODB_TEST: 'mongodb://localhost:27017/Portafolio',
    DDBB: {
        NAME: 'Portafolio',
        USER: 'leandro',
        PASS: 'portafolio2020'
    }
}
module.exports = config