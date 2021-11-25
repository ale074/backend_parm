// Ruta usu, ruta para trabjar con el objeto tabla tab_usu 'Tabla de usuarios'
//Importacion de  express
var express = require('express');
//Crear el objeto para definir las rutas
var router = express.Router();
// Importamos el modelo que ejecuta las sentencias SQL
var model = require('../models/mod_ser');

var utilities = require('../models/utilities');

var respuesta;

/**
 * Insertar registro en tabla usuarios
 */
router.post('/api/insSer', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_per) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_tip_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_esp) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.det_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.val_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.img_com_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ubi)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                cod_ser: paramsInsert.cod_ser,
                cod_per: paramsInsert.cod_per,
                cod_tip_ser: paramsInsert.cod_tip_ser,
                cod_esp: paramsInsert.cod_esp,
                det_ser: paramsInsert.det_ser,
                val_ser: paramsInsert.val_ser,
                val_ser: paramsInsert.img_com_ser,
                val_ser: paramsInsert.cod_ubi
            };
            model.insSer(datosCon, function(err, result) {
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
router.post('/api/updSer', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_per) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_tip_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_esp) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.det_ser) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.val_ser)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                cod_ser: paramsInsert.cod_ser,
                cod_per: paramsInsert.cod_per,
                cod_tip_ser: paramsInsert.cod_tip_ser,
                cod_esp: paramsInsert.cod_esp,
                det_ser: paramsInsert.det_ser,
                val_ser: paramsInsert.val_ser
            };
            model.updSer(datosCon, function(err, result) {
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
