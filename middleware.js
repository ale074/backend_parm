var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {
    //
    if(!req.headers.authorization) {
      return res
        .status(403)
        .send({message: "Your request does not have an authorization header"});
    }
    //
    jwt.verify(req.headers.authorization, config.TOKEN_SECRET, function(err, decoded) {
        if (err) {
          //
          return res
                 .status(403)
                .send({ success: false,
                        err_val: 1    ,
                        men_err:'Failed to authenticate token.' });
          //
        } else {
          //
          var payload = jwt.decode(req.headers.authorization, config.TOKEN_SECRET);
          //
          if(payload.exp <= moment().unix()) {
            //
             return res
                 .status(401)
                .send({success: false,
                       err_val: 1    ,
                       men_err:'The token has expired' });
            //
          }else{
            //
            next();
            //
          }
          //
        }
      });
  }
  
  
  exports.ensureAuthenticatedInv = function(req, res, next) {
    //
    if(!req.headers.authorization) {
      return res
        .status(403)
        .send({message: "Your request does not have an authorization header"});
    }
    //
    //var token = req.headers.authorization.split(" ")[1];
    //
    jwt.verify(req.headers.authorization, config.TOKEN_SECRET_INVITADO, function(err, decoded) {
        if (err) {
          //return res.json({ success: false,
          return res
                 .status(403)
                .send({ success: false,
                        err_val: 1    ,
                        men_err:'Failed to authenticate token.' });
          //
        } else {
          // if everything is good, save to request for use in other routes
          //
          //var payload = jwt.decode(token, config.TOKEN_SECRET);
          var payload = jwt.decode(req.headers.authorization, config.TOKEN_SECRET_INVITADO);
          //
          if(payload.exp <= moment().unix()) {
            //
             return res
                 .status(401)
                .send({success: false,
                       err_val: 1    ,
                       men_err:'The token has expired' });
            //
          }else{
            //req.user = payload.sub;
            next();
            //
          }
          //
        }
      });
  
  
  
  }
  