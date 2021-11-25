// Ruta usu, ruta para trabjar con el objeto tabla tab_usu 'Tabla de usuarios'
//Importacion de  express
var express = require('express');
//Crear el objeto para definir las rutas
var router = express.Router();
// Importamos el modelo que ejecuta las sentencias SQL
var model = require('../models/mod_esp');

var utilities = require('../models/utilities');

var respuesta;

/**
 * Insertar registro en tabla usuarios
 */
router.post('/api/insEsp', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.nom_esp) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.tit_esp) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.esp_esp) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.ced_esp) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_esp)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                nom_esp: paramsInsert.nom_esp,
                tit_esp: paramsInsert.tit_esp,
                esp_esp: paramsInsert.esp_esp,
                ced_esp: paramsInsert.ced_esp,
                ema_esp: paramsInsert.ema_esp
            };
            model.insEsp(datosCon, function(err, result) {
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
 * Actualizar Email especialista
 */
 router.post('/api/updEsp', function (req, res) {
     var paramsInsert = req.body.params;
     if (//validar parametros
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_esp) &&
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_esp)) {
             respuesta = {
                 'err_val': 1,
                 'men_err': 'Missing Parameters'
             };
             res.status(400).json(respuesta);
         } else {
             var datosCon = {
                 ema_esp: paramsInsert.ema_esp,
                 cod_esp: paramsInsert.cod_esp
             };
             model.updEsp(datosCon, function(err, result) {
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
  * obtener especialista
  */
 router.post('/api/getEsp', function (req, res) {
     var paramsInsert = req.body.params;
     if (//validar parametros
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_esp)) {
             respuesta = {
                 'err_val': 1,
                 'men_err': 'Missing Parameters'
             };
             res.status(400).json(respuesta);
         } else {
             var datosCon = {
                 cod_esp: paramsInsert.cod_esp
             };
             model.getEsp(datosCon, function(err, result) {
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
