// Ruta usu, ruta para trabjar con el objeto tabla tab_usu 'Tabla de usuarios'
//Importacion de  express
var express = require('express');
//Crear el objeto para definir las rutas
var router = express.Router();
// Importamos el modelo que ejecuta las sentencias SQL
var model = require('../models/mod_ubi');

var utilities = require('../models/utilities');

var respuesta;

/**
 * Insertar registro en tabla ubicacion
 */
router.post('/api/insUbi', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.pai_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.dep_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.mun_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.dir_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_pos_ubi)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                pai_ubi: paramsInsert.pai_ubi,
                dep_ubi: paramsInsert.dep_ubi,
                mun_ubi: paramsInsert.mun_ubi,
                dir_ubi: paramsInsert.dir_ubi,
                cod_pos_ubi: paramsInsert.cod_pos_ubi
            };
            model.insUbi(datosCon, function(err, result) {
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
 * Actualizar ubicacion
 */
router.post('/api/updUbi', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.pai_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.dep_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.mun_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.dir_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_pos_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ubi)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                pai_ubi: paramsInsert.pai_ubi,
                dep_ubi: paramsInsert.dep_ubi,
                mun_ubi: paramsInsert.mun_ubi,
                dir_ubi: paramsInsert.dir_ubi,
                cod_pos_ubi: paramsInsert.cod_pos_ubi,
                cod_ubi: paramsInsert.cod_ubi
            };
            model.updUbi(datosCon, function(err, result) {
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
 * Consulta de ubicacion
 */
router.post('/api/getUbi', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ubi)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                cod_ubi: paramsInsert.cod_ubi
            };
            model.getUbi(datosCon, function(err, result) {
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

module.exports = router;
























//----------------------------------------

//Aqui no
module.exports = router;
