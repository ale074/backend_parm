var obj = {};

    obj.isValidateAndDefineAndNotNull = function(paramToValidate) {
        var isValidate = true;

        if(paramToValidate === null || paramToValidate === "" || paramToValidate === undefined) {
            return !isValidate;
        }
        return isValidate;
    }

    /**
     * Funcion para organizar los parametros y hacer un update 
     * @param {*} objAct elementos parametro: valor a actualizar 
     * @param {*} objProhibited array de elementos que no se pueden actualizar
     * @param {*} isSupportEmptyParams sopota actualizar con datos vacios ?
     * @returns promise
     */
    obj.orderParamsToUpdate = function (objAct, objProhibited, isSupportEmptyParams){
        //
        return new Promise((resolve, reject) => {
            //
            //1 Valido que existe objeto a actualizar
            if (objAct && (Object.keys(objAct).length) >= 1) {
                var numUpdParams = Object.keys(objAct).length
                //2 Valido que sean más de un parametro el que se actualice
                if (numUpdParams > 1) {
                    //Valido si objProhibited esta vacio o nullo para no validar los parametros prohibidos
                    if (obj.isValidateAndDefineAndNotNull(objProhibited)) {
                        var isParamNotPermit = false;
                        for (const property in objAct) {
                            var keyParamToCheck = `${property}`;
                            var valueParamToCheck = `${objAct[property]}`;
                            if (!isParamValidateToUpdate(objProhibited, keyParamToCheck, valueParamToCheck, isSupportEmptyParams)) {
                                isParamNotPermit = true;
                            }
                        }
                        if (isParamNotPermit) {
                            reject('Error actualizando, parametro no permitido para actualizar');
                        } else {
                            var sql = getParamsToMysql(objAct, numUpdParams);
                            resolve((sql));
                        }
                    } else {
                        var sql = getParamsToMysql(objAct, numUpdParams);
                        resolve((sql));
                    }
                } else {
                    //1 compruebo que sea un parametro permitido y que no este nulo , luego lo parametrizo a mysql parametro = valor
                    var keyParamToValidate = getKeyFromParam(objAct);
                    var valueParam = objAct[keyParamToValidate];
                    if (isParamValidateToUpdate(objProhibited, keyParamToValidate, valueParam, isSupportEmptyParams)) {
                        resolve(getFormatParamToMysql(objAct))
                    }
                    reject('Error actualizando, parametro invalido para actualizar');
                }
            } else { 
                reject('Error actualizando, falta objeto de parametros a actualizar');
            }
        });
    }

    
    /**
     * 
     * @param {*} arrayParamsProhibited ejemplo [cod_pro, sal_pro]
     * @param {*} paramToValidate ejemplo { nom_com : 'Nuevo nombre comercio }
     * @param {*} isSupportEmptyParams Indica si permite valores vacios 
     */
    function isParamValidateToUpdate(arrayParamsProhibited, keyParamToCheck, valueParamToCheck, isSupportEmptyParams) {
        var isParamValidated = true;
        var idxProhibitedParam = arrayParamsProhibited ? arrayParamsProhibited.indexOf(keyParamToCheck) : -1;//

        //Valido si esta el parametro dentro de la lista prohibida
        if (idxProhibitedParam !== -1) {
            return !isParamValidated;
        } else {
            //retorno true si el parametro no es null o si 
            //Valido si el soporto vacio y si esta vacio
            if (!obj.isValidateAndDefineAndNotNull(valueParamToCheck) &&  isSupportEmptyParams) {
                return !isParamValidated;
            } else {
                //retorno ternario 
                return isParamValidated ;
            }
        }
    }


    /**
     * Funcion para extraer el nombre del parametro
     * @param {*} param 
     */
    function getKeyFromParam(param) {
        var nameParam = Object.keys(param);
        return nameParam[0];
    }

    function getFormatParamToMysql(param) {
        var key = getKeyFromParam(param);
        var value = param[key];
        //return key + " = " + value;
        return ` ${key} = '${value}'`
    }

    function getParamsToMysql(objAct, numUpdParams) {
        var sql = '';
        var i = 1;
        for (const property in objAct) {
            if (i == numUpdParams) {
                sql = sql + ` ${property} = '${objAct[property]}'`
            } else {
                sql = sql + ` ${property} = '${objAct[property]}' ,`
            }
            i++;
        }
        return sql;
    }

module.exports = obj;
