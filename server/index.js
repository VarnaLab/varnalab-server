
var express = require('express')
var parser = require('body-parser')

var middlewares = {
  oauth: require('../middlewares/oauth'),
  invite: require('../middlewares/invite')
}


module.exports = (config) => {
  var server = express()

  server.use(parser.urlencoded({extended: true}))
  server.use(parser.json())

  server.use('/oauth', middlewares.oauth(config.oauth))
  server.use('/invite', middlewares.invite(config.invite))

  return server
}
