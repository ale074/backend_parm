// Ruta usu, ruta para trabjar con el objeto tabla tab_usu 'Tabla de usuarios'
//Importacion de  express
var express = require('express');
//Crear el objeto para definir las rutas
var router = express.Router();
// Importamos el modelo que ejecuta las sentencias SQL
var model = require('../models/mod_eps');

var utilities = require('../models/utilities');

var respuesta;

/**
 * Insertar registro en tabla usuarios
 */
router.post('/api/insEps', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.nom_eps) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.tel_eps) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_eps) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.ubi_eps)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                nom_eps: paramsInsert.nom_eps,
                tel_eps: paramsInsert.tel_eps,
                ema_eps: paramsInsert.ema_eps,
                ubi_eps: paramsInsert.ubi_eps
            };
            model.insEps(datosCon, function(err, result) {
                if (result) {
                    respuesta = {
                        'data': result,
                        'err_val': 0,
                        'men_err': ''
                    };
                    res.status(200).json(respuesta);
                } else {
                    respuesta = {
                        'err_val': 1,
                        'men_err': 'Not Exist'
                    };
                    res.status(500).json(respuesta);
                }
            });
        }
});

/**
 * Actualizar Email del usuario
 */
 router.post('/api/updEps', function (req, res) {
     var paramsInsert = req.body.params;
     if (//validar parametros
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.nom_eps) &&
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.tel_eps) &&
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_eps) &&
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.ubi_eps)) {
             respuesta = {
                 'err_val': 1,
                 'men_err': 'Missing Parameters'
             };
             res.status(400).json(respuesta);
         } else {
             var datosCon = {
                 nom_eps: paramsInsert.nom_eps,
                 tel_eps: paramsInsert.tel_eps,
                 ema_eps: paramsInsert.ema_eps,
                 ubi_eps: paramsInsert.ubi_eps
             };
             model.ipdEps(datosCon, function(err, result) {
                 if (result) {
                     respuesta = {
                         'data': result,
                         'err_val': 0,
                         'men_err': ''
                     };
                     res.status(200).json(respuesta);
                 } else {
                     respuesta = {
                         'err_val': 1,
                         'men_err': 'Not Exist'
                     };
                     res.status(500).json(respuesta);
                 }
             });
         }
 });

























//----------------------------------------

//Aqui no
module.exports = router;
