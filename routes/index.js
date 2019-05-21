var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).send({
    success : true,
    message : "",
    type : "Health check",
    action: "Index",
    data : ['HALA MADRID'],
    meta:{}
  });
});

router.get('/healthcheck/v1/', function(req, res, next) {
  return res.status(200).send({
    success : null,
    message : "",
    type : "Health check",
    action : "Index",
    id : null,
    data : ['HALA MADRID!!!']
  });
});

module.exports = router;