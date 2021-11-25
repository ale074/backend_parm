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
obj.insSer = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `INSERT INTO tab_ser (cod_per, cod_tip_ser, cod_esp, det_ser, val_ser, img_com_ser, cod_ubi) 
        VALUES ('${comData.cod_per}', '${comData.cod_tip_ser}', '${comData.cod_esp}', '${comData.det_ser}', '${comData.val_ser}', '${comData.img_com_ser}', '${comData.cod_ubi}')`;
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
 * @param {*} comData data to update
 * @param {*} callback function
 *
 */
 obj.updSer = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = `UPDATE tab_ser SET cod_tip_ser ='${comData.cod_tip_ser}', 
        cod_esp ='${comData.cod_esp}', det_ser ='${comData.det_ser}', val_ser ='${comData.val_ser}', 
        img_com_ser ='${comData.img_com_ser}', cod_ubi ='${comData.cod_ubi}' WHERE cod_ser = '${comData.cod_ser}'`;
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
 * @param {*} comData cod_ser
 * @param {*} callback function
 *
 */
 obj.getSer = function(comData, callback) {
    connection = mysql.createConnection(
        conn
    );
    if (connection) {
        var sql = ``;
        switch (comData.type) {
            case 1:
                sql = `SELECT * FROM tab_ser WHERE cod_ser = '${comData.cod_ser}'`;
                break;

            case 2:
                sql = `SELECT * FROM tab_ser WHERE cod_usu = '${comData.cod_usu}'`;
                break;
    

            case 3:
                sql = `SELECT * FROM tab_ser WHERE cod_tip_ser = '${comData.cod_tip_ser}'`;
                break;
        

            case 4:
                sql = `SELECT * FROM tab_ser WHERE cod_esp = '${comData.cod_esp}'`;
                break;
                    
            case 5:
                sql = `SELECT * FROM tab_ser WHERE val_ser > '${comData.val_men}' AND '${comData.val_may}' > val_ser`;
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
