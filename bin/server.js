#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

var mw = ['varnalab', 'invite', 'grant']

if (argv.help) {
  mw.forEach((m) => console.log(`--${m} /path/to/config.json`))
  console.log('--port number')
  console.log('--env environment')
  process.exit()
}

if (mw.some((m) => !argv[m])) {
  mw.forEach((m) => console.log(`Specify --${m} /path/to/config.json`))
  process.exit()
}
if (!argv.port) {
  console.log('Specify --port number')
}

var env = process.env.NODE_ENV || argv.env || 'development'


var path = require('path')

var config = {
  varnalab: require(path.resolve(process.cwd(), argv.varnalab))[env],
  invite: require(path.resolve(process.cwd(), argv.invite))[env],
  grant: require(path.resolve(process.cwd(), argv.grant))[env],
}

var server = require('../')(config)

server.listen(argv.port, () => {
  console.log([
    'VarnaLab Server',
    argv.port,
    new Date().getTime(),
    new Date().toString()
  ].join(' | '))
})
