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
obj.insAle = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `INSERT INTO tab_ale (des_ale, fec_cre, fec_ale, cod_ser)
        VALUES ('${comData.des_ale}', '${comData.fec_cre}', '${comData.fec_ale}', '${comData.cod_ser}')`;
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
obj.updAle = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `UPDATE tab_ale SET des_ale ='${comData.des_ale}', fec_ale ='${comData.fec_ale}' WHERE cod_ale ='${comData.cod_ale}'`;
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
 obj.getAle = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = ``;
        switch (comData.type) {
            case 1:
                
                break;sql = `SELECT * FROM tab_ale WHERE cod_ale ='${comData.cod_ale}'`;

            case 2:
                sql = `SELECT * FROM tab_ale WHERE cod_usu = '${comData.cod_usu}'`;
                break;
        

            case 3:
                sql = `SELECT * FROM tab_ale WHERE fec_ale BETWEEN '${comData.fec_men}' AND '${comData.fec_may}'`;
                break;
        
    

            case 4:
                sql = `SELECT * FROM tab_ale WHERE fec_cre BETWEEN '${comData.fec_men}' AND '${comData.fec_may}'`;
                break;
                    
            default:
                sql = ``;
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