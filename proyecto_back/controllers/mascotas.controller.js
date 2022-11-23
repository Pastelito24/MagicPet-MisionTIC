const Mascota = require('../models/mascotas.model');

let response = {
    msg: "",
    exito: false
}

exports.create = function(req,res){
    let mascota = new Mascota({
        nombre: req.body.nombre,
        nombre_provisional: req.body.nombre_provisional,
        raza: req.body.raza,
        peso: req.body.peso,
        vacunas: req.body.vacunas,
        esterilizado: req.body.esterilizado
    })
    mascota.save(function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al guardar la Mascota"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg ="La mascota se guardo correctamente"
        res.json(response)
    })
}

exports.find = function(req,res){
    Mascota.find(function(err, mascotas){
        res.json(mascotas)
    })
}

exports.findOne = function(req,res){
    Mascota.findOne({_id: req.params.id},function(err, mascota){
        res.json(mascota)
    })
}

exports.update = function(req,res){
    let mascota = ({
        nombre: req.body.nombre,
        nombre_provisional: req.body.nombre_provisional,
        raza: req.body.raza,
        peso: req.body.peso,
        vacunas: req.body.vacunas,
        esterilizado: req.body.esterilizado
    })
    Mascota.findByIdAndUpdate(req.params.id,{$set: mascota},function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al modificar la mascota"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg = "La mascota se actualizo correctamente"
        res.json(response)
    })
}

exports.remove = function(req,res){
    Mascota.findByIdAndRemove({_id: req.params.id},function(err){
        if(err){
            console.error(err)
            response.exito = false,
            response.msg = "Error al eliminar la mascota"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg ="La mascota se elimino correctamente"
        res.json(response)
    })
}
