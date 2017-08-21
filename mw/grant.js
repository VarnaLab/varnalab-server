
var express = require('express')
var session = require('express-session')
var Grant = require('grant').express()
var Log = require('../lib/log')


module.exports = (config) => {
  var log = Log('grant')
  var mw = express()
  var grant = new Grant(config)

  mw.use(session({
    name: config.server.cookie.name,
    secret: config.server.cookie.secret,
    saveUninitialized: false,
    resave: false
  }))

  mw.use(grant)

  mw.use('/connected', (req, res) => {
    log({
      provider: req.session.grant.provider,
      override: req.session.grant.override
    })

    var json = JSON.stringify(req.session.grant, null, 2)
    delete req.session.grant

    res.end(json)
  })

  return mw
}
