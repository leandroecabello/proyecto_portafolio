'use strict'

let mongoose = require('mongoose')
let schema = mongoose.Schema

let projectSchema = schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    urlProject: String,
    repoGit: String,
    image: String
})

module.exports = mongoose.model('Project', projectSchema)
// projects --> guarda los documentos en la coleción
