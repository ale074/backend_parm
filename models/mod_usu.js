// Importamos los datos de la conexion
var conn=require('./connection');
//importamos el paquete mysql
var mysql = require('mysql');


var obj = {};

/**
 * Insertar Usuario
 * @param {*} comData data to insert
 * @param {*} callback function
 * 
 */
obj.insUsu = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `INSERT INTO tab_usu (nom_usu, ema_usu, cla_usu) 
        VALUES ('${comData.nom_usu}', '${comData.ema_usu}', '${comData.cla_usu}')`;
        connection.query(sql, function (err, result) {
            if (err || !result) {
                return connection.rollback(function () {
                    connection.end();
                    throw err;
                });
            } else {
                callback(null, result);
            }
        });
        connection.end();
    }

}

/**
 * @param {*} comData data to insert
 * @param {*} callback function
 *
 */
 obj.insPer = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `INSERT INTO tab_per (nom_per, ape_per, fec_nac_per, cod_ubi, cod_eps) 
        VALUES ('${comData.cod_per}', '${comData.nom_per}', '${comData.ape_per}', '${comData.fec_nac_per}', '${comData.cod_ubi}', '${comData.cod_eps}')`;
        connection.query(sql, function (err, result) {
            if (err || !result) {
                return connection.rollback(function () {
                    connection.end();
                    throw err;
                });
            } else {
                callback(null, result);
            }
        });
        connection.end();
    }

}


/**
 * Update Usuario
 * @param {*} comData data to Update
 * @param {*} callback function
 * 
 */
 obj.updUsu = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        
        var sql = ``;
        switch (comData.type) {
            case 1:
                sql = `UPDATE tab_usu SET nom_usu ='${comData.nom_usu}', ema_usu ='${comData.ema_usu}', cla_usu ='${comData.cla_usu}' 
                WHERE cod_usu ='${comData.cod_usu}'`;
                break;
    
            case 2:
                sql = `UPDATE tab_per SET cod_eps = '${comData.cod_eps}' WHERE cod_per = '${comData.cod_per}'`;
                break;
    
            case 3:
                sql = `UPDATE tab_usu SET ema_usu ='${comData.ema_usu}' 
                WHERE cod_usu ='${comData.cod_usu}' AND cla_usu ='${comData.cla_usu}'`;
                break;

            case 4:
                sql = `UPDATE tab_usu SET cla_usu ='${comData.cla_usu}' 
                WHERE cod_usu ='${comData.cod_usu}'`;
                break;
                    
                
            default:
                break;
        }
        connection.query(sql, function (err, result) {
            if (err || !result) {
                return connection.rollback(function () {
                    connection.end();
                    throw err;
                });
            } else {
                callback(null, result);
            }
        });
        connection.end();
    }

}

/**
 * Consultar Usuario
 * @param {*} comData .cod_usu
 * @param {*} callback function
 * 
 */
 obj.getUsu = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = ``;
        switch (comData.type) {
            case 1:
                sql = `SELECT * FROM tab_usu WHERE cod_usu ='${comData.cod_usu}'`;
                break;
        
            case 2:
                sql = `SELECT * FROM tab_usu`;
                break;

            case 3:
                sql = `SELECT ema_usu FROM tab_usu WHERE ema_usu ='${comData.ema_usu}'`;
                break;

            case 4:
                sql = `SELECT cod_usu FROM tab_usu WHERE cla_usu ='${comData.cla_usu}'`;
                break;
                    
                
            default:
                break;
        }
        connection.query(sql, function (err, result) {
            if (err || !result) {
                return connection.rollback(function () {
                    connection.end();
                    throw err;
                });
            } else {
                callback(null, result);
            }
        });
        connection.end();
    }

}






module.exports =obj;