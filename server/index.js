
var express = require('express')
var parser = require('body-parser')

var mw = {
  oauth: require('../mw/oauth'),
  invite: require('../mw/invite')
}


module.exports = (config) => {
  var server = express()

  server.use(parser.urlencoded({extended: true}))
  server.use(parser.json())

  server.use('/oauth', mw.oauth(config.oauth))
  server.use('/invite', mw.invite(config.invite))

  return server
}
