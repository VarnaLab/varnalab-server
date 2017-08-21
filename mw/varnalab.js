
var express = require('express')
var api = require('varnalab-api')
var Log = require('../lib/log')


module.exports = (config) => {
  config.log = Log('varnalab')
  var mw = express()

  mw.use('/api', api(config))

  return mw
}
