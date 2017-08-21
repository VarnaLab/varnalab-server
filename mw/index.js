
var express = require('express')
var parser = require('body-parser')

var mw = {
  grant: require('./grant'),
  invite: require('./invite'),
  varnalab: require('./varnalab'),
}


module.exports = (config) => {
  var app = express()

  app.use(parser.urlencoded({extended: true}))
  app.use(parser.json())

  app.use('/grant', mw.grant(config.grant))
  app.use('/invite', mw.invite(config.invite))
  app.use('/varnalab', mw.varnalab(config.varnalab))

  return app
}
