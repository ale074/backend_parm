//Funcion para verificar si se intentan hacer un sql diferente al que se tiene permitido
//Por medio de Injection SQL

exports.funFilCad = function(req, res, next) {
    //
    var str1 = req.body;
    //
    var str= JSON.stringify(str1);
    //
    if(str.indexOf(";")!=-1){
      //
      return res
        .status(403)
        .send({err_val:'1',men_err: "Verificar los datos ingresados "});
      //
    }else{
      //
      next();
      //
    }
    //
  }
  