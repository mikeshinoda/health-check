if (process.env.ENV != 'production') {
    require('dotenv').config();
  }
  
  
  var express = require('express');
  var cors = require('cors');
  var path = require('path');
  var bodyParser = require('body-parser');
    
  var app = express();
  
  app.use(cors());
  
  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  var routes = require('./routes/index');
  
  app.use('/', routes);
  
  app.use(function(req, res, next) {
    res.status(404).send({
      success : false,
      message : "error.notFound.ar",
      type : "healthcheck Srv",
      action: req.method + ' ' +req.originalUrl,
      data : [],
      meta:{}
    });
  });
  
  app.use(function (err, req, res, next) {
    if(err && err.status==520){
      return next();
    }
    res.status(520).send({
      success : false,
      message : "somethingWentWrong",
      type : "healhtcheck Srv",
      action: 'uncaughtException'
    });
  });
  
  module.exports = app;
  