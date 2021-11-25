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
obj.insEps = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `INSERT INTO tab_eps (nom_eps, num_eps, ema_eps, cod_ubi) 
        VALUES ('${comData.nom_eps}', '${comData.num_eps}', '${comData.ema_eps}', '${comData.cod_ubi}')`;
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
 obj.updEps = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `UPDATE tab_usu SET tel_eps ='${comData.tel_eps}', ema_eps ='${comData.ema_eps}' WHERE cod_eps ='${comData.cod_eps}'`;
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
 obj.getEps = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `SELECT * FROM tab_usu WHERE cod_eps ='${comData.cod_eps}'`;
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