
var express = require('express')
var bodyParser = require('body-parser')

var middlewares = {
  oauth: require('../middlewares/oauth'),
  invite: require('../middlewares/invite')
}


module.exports = (config) => {
  var server = express()

  server.use(bodyParser.urlencoded({extended: true}))
  server.use(bodyParser.json())

  server.use('/oauth', middlewares.oauth(config.oauth))
  server.use('/invite', middlewares.invite(config.invite))

  return server
}
