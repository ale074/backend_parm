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
obj.insEsp = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `INSERT INTO tab_esp (nom_esp, tit_esp, esp_esp, ced_esp, ema_esp)
        VALUES ('${comData.nom_esp}', '${comData.Tit_esp}', '${comData.esp_esp}', '${comData.ced_esp}', '${comData.ema_esp}')`;
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
 obj.updEmaEsp = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `UPDATE tab_esp SET ema_esp ='${comData.ema_esp}' WHERE cod_esp ='${comData.cod_esp}'`;
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
 obj.getEsp = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `SELECT * FROM tab_esp WHERE cod_esp ='${comData.cod_esp}'`;
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