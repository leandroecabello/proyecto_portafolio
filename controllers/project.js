'use strict'

let Project = require('../models/project')
let fs = require('fs')
let path = require('path')

let controller = {
    home: function(req, res){
        return res.status(200).send({
            message:'Soy la home'
        })
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'soy el metodo o acción test del controlador de project'
        })
    },

    saveProject: function(req, res){
        let project = new Project()
        
        let params = req.body
        project.name = params.name
        project.description = params.description
        project.category = params.category
        project.year = params.year
        project.langs = params.langs
        project.urlProject = params.urlProject
        project.repoGit = params.repoGit
        project.image = null

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({
                message: 'error al guardar'
            }) 
            
            if(!projectStored) return res.status(404).send({
                message: 'No se pudo guardar el proyecto'
            })
            
            return res.status(200).send({
                project: projectStored
            })  
        })
    }, 

    getProject: function(req, res){
        let projectId = req.params.id

        //en caso de ponerle que el parametro id sea opcional se debera realizar esta condición
        if(projectId === null) return res.status(404).send({
            message: 'El proyecto no existe'
        })

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({
                message: 'Error al devolver los datos'
            })

            if(!project) return res.status(404).send({
                message: 'El proyecto no existe'
            })

            return res.status(200).send({
                project
            })
        })
    },

    getProjects: function(req, res){
        
        Project.find({}).sort('-year').exec( (err, projects) => {

            if(err) return res.status(500).send({
                message: 'Error al devolver los datos'
            })

            if(!projects) return res.status(404).send({
                message: 'No hay proyectos que mostrar'
            })

            return res.status(200).send( { projects } )
        })
    },

    updateProject: function(req, res){
        let projectId = req.params.id
        let update = req.body

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({
                message: 'Error al actualizar'
            })

            if(!projectUpdated) return res.status(404).send({
                message: 'No existe el proyecto'
            })

            return res.status(200).send({
                project: projectUpdated
            })
        })
    },
    
    deleteProject: function(req, res){
        let projectId = req.params.id

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).send({
                message: 'No se pudo borrar el proyecto'
            })

            if(!projectRemoved) return res.status(404).send({
                message: 'No se puede eliminar el proyecto'
            })

            return res.status(200).send({
                project: projectRemoved
            })
        })
    },
    
    uploadImage: function(req, res){
        let projectId = req.params.id
        let fileName = 'Imagen no subida...'

        if(req.files){
            let filePath = req.files.image.path
            let fileSplit = filePath.split('\\')
            let fileName = fileSplit[1]
            //si no se subio bien que borre el archivo
            let extSplit = fileName.split('\.')
            let fileExt = extSplit[1]

            if(fileExt==='png' || fileExt==='jpg' || fileExt==='jpeg' || fileExt==='gif'){

                Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {
                    //{new:true} -> devuelve el ultimo objeto guardado en la bd
                    
                    if(err) return res.status(500).send({
                        message: 'La imagen no se ha subido'
                    })

                    if(!projectUpdated) return res.status(404).send({
                        message: 'El proyecto no existe'
                    })

                    return res.status(200).send({
                        project: projectUpdated
                    })
                })
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                       message: 'La extención no es valida' 
                    })
                })
            }

        }else{
            return res.status(200).send({
                message: fileName
            })   
        }
    },

    getImageFile: function(req, res) {
        let file = req.params.image;
        let pathFile = './uploads/' + file;
        
        fs.exists(pathFile, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(pathFile))
            }else{
                return res.status(200).send({
                    message: 'No existe la imagen...'
                })
            }
        })
    }
}

module.exports = controller