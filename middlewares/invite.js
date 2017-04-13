
var express = require('express')
var Invite = require('lure')


module.exports = (config) => {
  var api = express()
  var invite = Invite(config.invite)

  api.post('/send', (req, res) => {
    var provider = config.invite[req.body.key].provider
    invite[provider].send(req.body)
      .then((results) => {
        console.log(JSON.stringify({
          timestamp: new Date().getTime(),
          date: new Date().toString(),
          provider,
          input: req.body
        }))
        res.json(results[0][1])
      })
      .catch((err) => {
        console.log(JSON.stringify({
          timestamp: new Date().getTime(),
          date: new Date().toString(),
          provider,
          error: err.message
        }))
        res.json({error: err.message})
      })
  })

  api.get('/users', (req, res) => {
    var provider = config.invite[req.query.key].provider
    invite[provider].users(req.query)
      .then((result) => res.json(result))
      .catch((err) => res.json({error: err.message}))
  })

  return api
}
