
var express = require('express')
var bodyParser = require('body-parser')
var middlewares = {
  invite: require('../middlewares/invite')
}


module.exports = (config) => {
  var server = express()

  server.use(bodyParser.urlencoded({extended: true}))
  server.use(bodyParser.json())

  server.use('/invite', middlewares.invite(config))

  return server
}
