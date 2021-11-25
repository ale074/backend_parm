const express = require('express')


// Multer
const multer  = require('multer')
//tocken
var middleware = require('./middleware');
var bodyParser = require('body-parser');

//Filtrar injection
var filCadena = require('./filCadena');

// Iniciamos las rutas de nuestro servidor/API
var router=express.Router()



var bodyParser             = require("body-parser");
var cors                   = require('cors');
const app = express()

// Rutas ------------------------------------
var ruta_usu = require("./routes/ruta_usu");



//-----------------------------------------------

//notificaciones
app.use(bodyParser.json());
app.use(cors({
	origin: '*'
}));

//-------------------------------- inicio
app.use(router);
app.use(ruta_usu)


//------------------------------------------


//prueba token, SE DEBE ELIMINAR AL CORREGIR TODOS LOS ROUTES SIN TOKEN
var  jwt   = require('jsonwebtoken');
var config = require('./config');
var moment = require('moment');
const { send } = require("process");
const { application } = require("express");

function createTokenCliente(uid) {
	var payload ={
	  "iat": moment().unix(),
	  "exp": moment().add(1, "hours").unix(),
	  "cod": moment().unix()//"uid_fir_par": cod, 
	  }
	  //
	return jwt.sign(payload, config.TOKEN_SECRET);
}
  

function createTokenInvitado(cod) {
  var payload ={
    "iat": moment().unix(),
    "exp": moment().add(1, "hours").unix(),
    "uid_fir_par": cod,
	}
	//
  return jwt.sign(payload, config.TOKEN_SECRET_INVITADO);
}

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



//ARchivos estaticos
app.use(express.static('public'));

//http://expressjs.com/es/advanced/best-practice-security.html
app.disable('x-powered-by');
//Upload file
app.post('/upload', multer({ dest: './public/img/com_ser_med' }).single('file'),(req,res) => {

	var storage = multer.diskStorage({
		destination: function(req, file, callback) {
			callback(null, './public/img/com_ser_med')
		},
		filename: function(req, file, callback) {
			//callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		callback(null, file.originalname);
		}
	})

})

app.post('/upload2', function(req, res) {
	var upload = multer({
		storage: storage
	}).single('file')
	upload(req, res, function(err) {
		res.end('File is uploaded') 
	})
})

//Generar y retornar token para usuario no registrado
router.post('/genToc', function(request,response){
	//
	//response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
	response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, PATCH, DELETE');
	//
	if (typeof request.body !== 'undefined' && request.body !="" && request.body.cod == "invitado" )
	{
		//
		var datos={
			'cod_sec_inv' : request.body.cod_sec_inv                ,
			'token'       : createTokenInvitado(request.body.cod)
		}
		//
		respuesta = {datos,//Respuesta desde BD
								   'err_val':0,//Termiacion OK
								   'men_err':''//Mensaje Error
								}
		response.status(200).json(respuesta);
	}
	else
	{
		respuesta={'err_val':1,//Marco 1 como error en respuesta
							   'men_err':'Not Exist'}//Mensaje Error
		response.status(200).json(respuesta);
	}

	//
});

//Generar y retornar token para usuario parm cliente
router.post('/genTocAtuDel', function(request,response){
	//
	//response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
	response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, PATCH, DELETE');
	//
	console.log(request);
	if (typeof request.body !== 'undefined' && request.body !="" && request.body.cod === "parm")
	{
		//
		var datos={
			'cod' : request.body.cod                ,
			'token' : createTokenCliente(request.body.cod)
		}
		//
		respuesta = {datos,//Respuesta desde BD
								   'err_val':0,//Termiacion OK
								   'men_err':''//Mensaje Error
								}
		response.status(200).json(respuesta);
	}
	else
	{
		respuesta={'err_val':1,//Marco 1 como error en respuesta
							   'men_err':"Invalid token quieto pirobo"}//Mensaje Error
		response.status(400).json(respuesta);
	}

	//
});


//Router para validar token partner 
router.use('/api',middleware.ensureAuthenticated,function(req,res,next){
	//res.setHeader('Access-Control-Allow-Origin', 'http://181.58.161.240:8100');
	//res.header('Access-Control-Allow-Origin', '*');
	//res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	//res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
	 // intercept OPTIONS method
	 //console.log("middel");
	if ('OPTIONS' == req.method) {
		res.send(200);
		console.log("res send 200");
	}
	else {
		//console.log("next");
		next();
	}

});


//
app.get('/',function(req,res){
    res.status(200).send('server delivery ready');
  });


const port = 3000
var server = require('http').createServer(app);
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

