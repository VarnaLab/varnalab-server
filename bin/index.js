#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

var flags = {
  oauth: {text: '--oauth path/to/config.json', required: true},
  invite: {text: '--invite path/to/config.json', required: true},
  env: {text: '--env environment'},
  port: {text: '--port number', required: true}
}

if (argv.help) {
  Object.keys(flags).forEach((flag) => console.log(flags[flag].text))
  process.exit()
}

Object.keys(flags).forEach((flag) => {
  if (!argv[flag] && flags[flag].required) {
    console.log('Specify', flags[flag].text)
    process.exit()
  }
})

var env = process.env.NODE_ENV || argv.env || 'development'

var path = require('path')

var config = {
  oauth: require(path.resolve(process.cwd(), argv.oauth))[env],
  invite: require(path.resolve(process.cwd(), argv.invite))[env]
}

var server = require('../')(config)

server.listen(argv.port, () => {
  console.log('Oh Hi', argv.port, new Date().getTime(), new Date().toString(), '!')
})
