
var express = require('express')
var Invite = require('lure')
var Log = require('../lib/log')


module.exports = (config) => {
  var log = Log('invite')
  var api = express()
  var invite = Invite(config)

  api.post('/send', (req, res) => {
    var provider = config[req.body.key].provider

    invite[provider].send(req.body)
      .then((results) => {
        log(req.body)
        res.json(results[0][1])
      })
      .catch((err) => {
        log(err)
        res.json({error: err.message})
      })
  })

  api.get('/users', (req, res) => {
    var provider = config[req.query.key].provider

    invite[provider].users(req.query)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        log(err)
        res.json({error: err.message})
      })
  })

  return api
}
