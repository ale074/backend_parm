// Ruta usu, ruta para trabjar con el objeto tabla tab_usu 'Tabla de usuarios'
//Importacion de  express
var express = require('express');
//Crear el objeto para definir las rutas
var router = express.Router();
// Importamos el modelo que ejecuta las sentencias SQL
var model = require('../models/mod_ale');

var utilities = require('../models/utilities');

var respuesta;

/**
 * Insertar registro en tabla usuarios
 */
router.post('/api/insAle', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.des_ale) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.fec_cre_ale) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.fec_ale) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ser)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                des_ale: paramsInsert.des_ale,
                fec_cre_ale: paramsInsert.fec_cre_ale,
                fec_ale: paramsInsert.fec_ale,
                cod_ser: paramsInsert.cod_ser
            };
            model.insAle(datosCon, function(err, result) {
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
 router.post('/api/updAle', function (req, res) {
     var paramsInsert = req.body.params;
     if (//validar parametros
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.des_ale) &&
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.fec_cre_ale) &&
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.fec_ale) &&
         !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ser)) {
             respuesta = {
                 'err_val': 1,
                 'men_err': 'Missing Parameters'
             };
             res.status(400).json(respuesta);
         } else {
             var datosCon = {
                 des_ale: paramsInsert.des_ale,
                 fec_cre_ale: paramsInsert.fec_cre_ale,
                 fec_ale: paramsInsert.fec_ale,
                 cod_ser: paramsInsert.cod_ser
             };
             model.updAle(datosCon, function(err, result) {
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
