
var express = require('express')
var session = require('express-session')
var Grant = require('grant').express()


module.exports = (config) => {
  var api = express()

  api.use(session({
    name: config.server.cookie.name,
    secret: config.server.cookie.secret,
    saveUninitialized: false,
    resave: false
  }))

  api.use(new Grant(config))

  api.use('/connected', (req, res) => {
    res.end(JSON.stringify(req.session.grant, null, 2))
  })

  return api
}
