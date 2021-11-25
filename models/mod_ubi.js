// Importamos los datos de la conexion
var conn=require('./connection');
//importamos el paquete mysql
var mysql = require('mysql');
const connection = require('./connection');


var obj = {};

/**
 * @param {*} comData data to insert
 * @param {*} callback function
 *
 */
obj.insUbi = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `INSERT INTO tab_ubi (pai_ubi, dep_ubi, mun_ubi, dir_ubi, cod_pos_ubi) 
        VALUES ('${comData.pai_ubi}', '${comData.dep_ubi}', '${comData.mun_ubi}', '${comData.dir_ubi}', '${comData.cod_pos_ubi}')`;
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
 * Actualización de ubicacion
 * @param {*} comData data to update
 * @param {*} callback function
 *
 */
 obj.updUbi = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `UPDATE tab_ubi  SET pai_ubi ='${comData.pai_ubi}', dep_ubi ='${comData.dep_ubi}', mun_ubi ='${comData.mun_ubi}', dir_ubi ='${comData.dir_ubi}', cod_pos_ubi ='${comData.cod_pos_ubi}' 
        WHERE cod_ubi = '${comData.cod_ubi}'`;
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
 * Consulta de ubicacion
 * @param {*} comData data to update
 * @param {*} callback function
 *
 */
 obj.getUbi = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `SELECT * FROM tab_ubi WHERE cod_ubi = '${comData.cod_ubi}' LIMIT 1`;
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