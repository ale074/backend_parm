// Ruta usu, ruta para trabjar con el objeto tabla tab_usu 'Tabla de usuarios'
//Importacion de  express
var express = require('express');
//Crear el objeto para definir las rutas
var router = express.Router();
// Importamos el modelo que ejecuta las sentencias SQL
var model = require('../models/mod_usu');

var utilities = require('../models/utilities');

var respuesta;

/**
 * Insertar registro en tabla usuarios
 */
router.post('/api/insUsu', function (req, res) {
    var paramsInsert = req.body.params;
    console.log(req);
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.nom_usu) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_usu) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cla_usu)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                nom_usu: paramsInsert.nom_usu,
                ema_usu: paramsInsert.ema_usu,
                cla_usu: paramsInsert.cla_usu
            };
            model.insUsu(datosCon, function(err, result) {
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
 * Insertar registro en tabla persona
 */
 router.post('/api/insPer', function (req, res) {
    var paramsInsert = req.body.params;
    if (//validar parametros
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_per) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.nom_per) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.ape_per) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.fec_nac_per) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_ubi) &&
        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_eps)) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {
                nom_per: paramsInsert.cod_per,
                ape_per: paramsInsert.nom_per,
                nac_per: paramsInsert.ape_per,
                nac_per: paramsInsert.fec_nac_per,
                nac_per: paramsInsert.cod_ubi,
                nac_per: paramsInsert.cod_eps
            };
            model.insPer(datosCon, function(err, result) {
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
router.post('/api/updUsu', function (req, res) {
    var paramsInsert = req.body.params;
    var type = paramsInsert.type
    var validate = false;
    switch (type) {
        case 1:
            validate = !utilities.isValidateAndDefineAndNotNull(paramsInsert.nom_usu) &&
                        !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_usu) &&
                        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cla_usu) &&
                        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_usu);
            break;

        case 2:
            validate = !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_eps) &&
                        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_per);
            break;

        case 3:
            validate = !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_usu) &&
                        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_usu) &&
                        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cla_usu);
            break;

        case 4:
            validate = !utilities.isValidateAndDefineAndNotNull(paramsInsert.cla_usu) &&
                        !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_usu);
            break;


        default:
            break;
    }
    if (//validar parametros
        validate) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {};
            switch (type) {
                case 1:
                    datosCon = {
                        nom_usu: paramsInsert.nom_usu,
                        ema_usu: paramsInsert.ema_usu,
                        cla_usu: paramsInsert.cla_usu,
                        cod_usu: paramsInsert.cod_usu
                    }
                    break;

                case 2:
                    datosCon = {
                        cod_eps: paramsInsert.cod_eps,
                        cod_per: paramsInsert.cod_per
                    }
                    break;

                case 3:
                    datosCon = {
                        ema_usu: paramsInsert.ema_usu,
                        cod_usu: paramsInsert.cod_usu,
                        cla_usu: paramsInsert.cla_usu
                    }
                    break;

                case 4:
                    datosCon = {
                        cla_usu: paramsInsert.cla_usu,
                        cod_usu: paramsInsert.cod_usu
                    }
                    break;


                default:
                    break;
            }
            model.updEmaUsu(datosCon, function(err, result) {
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
 * Actualizar Usuario
 */
router.post('/api/updUsu', function (req, res) {
    var paramsInsert = req.body.params;
    var type = paramsInsert.type
    var validate = false;
    switch (type) {
        case 1:
            validate = !utilities.isValidateAndDefineAndNotNull(paramsInsert.cod_usu);
            break;

        case 2:
            validate = !utilities.isValidateAndDefineAndNotNull(paramsInsert.ema_usu);
            break;

        case 3:
            validate = !utilities.isValidateAndDefineAndNotNull(paramsInsert.cla_usu);
            break;

        default:
            break;
    }
    if (//validar parametros
        validate) {
            respuesta = {
                'err_val': 1,
                'men_err': 'Missing Parameters'
            };
            res.status(400).json(respuesta);
        } else {
            var datosCon = {};

            switch (type) {
                case 1:
                    datosCon = {
                        cod_usu: cod_usu
                    };
                    break;

                case 2:
                    datosCon = {
                        ema_usu: ema_usu
                    };
                    break;

                case 3:
                    datosCon = {
                        cla_usu: cla_usu
                    };
                    break;

                default:
                    break;
            }
            model.updUsu(datosCon, function(err, result) {
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


























//----------------------------------------

//Aqui no
module.exports = router;
