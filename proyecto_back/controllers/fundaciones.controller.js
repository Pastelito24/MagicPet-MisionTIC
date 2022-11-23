const Fundacion = require('../models/fundaciones.model');

let response = {
    msg: "",
    exito: false
}

exports.create = function(req,res){
    let fundacion = new Fundacion({
        nombre: req.body.nombre,
        email: req.body.email,
        nit: req.body.nit
    })
    fundacion.save(function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al guardar la Fundacion"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg ="La fundacion se guardo correctamente"
        res.json(response)
    })
}

exports.find = function(req,res){
    Fundacion.find(function(err, fundaciones){
        res.json(fundaciones)
    })
}

exports.findOne = function(req,res){
    Fundacion.findOne({_id: req.params.id},function(err, fundacion){
        res.json(fundacion)
    })
}

exports.update = function(req,res){
    let fundacion = ({
        nombre: req.body.nombre,
        email: req.body.email,
        nit: req.body.nit
    })
    Fundacion.findByIdAndUpdate(req.params.id,{$set: fundacion},function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al modificar la fundacion"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg = "La fundacion se actualizo correctamente"
        res.json(response)
    })
}

exports.remove = function(req,res){
    Fundacion.findByIdAndRemove({_id: req.params.id},function(err){
        if(err){
            console.error(err)
            response.exito = false,
            response.msg = "Error al eliminar la fundacion"
            res.json(response)
            return;
        }
        response.exito = true,
        response.msg ="La fundacion se elimino correctamente"
        res.json(response)
    })
}
