
var express = require('express')
var parser = require('body-parser')

var mw = {
  grant: require('../mw/grant'),
  invite: require('../mw/invite')
}


module.exports = (config) => {
  var server = express()

  server.use(parser.urlencoded({extended: true}))
  server.use(parser.json())

  server.use('/grant', mw.grant(config.grant))
  server.use('/invite', mw.invite(config.invite))

  return server
}
