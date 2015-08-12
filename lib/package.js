'use strict'

var fs = require('fs')
var os = require('os')

exports.read = function (file, cb) {
  fs.exists(file, function (exists) {
    if (!exists) return cb(new Error('No package.json found'))

    fs.readFile(file, function (err, data) {
      if (err) return cb(err)

      try {
        data = JSON.parse(data)
      } catch (e) {
        return cb(new Error('No valid package.json.found'))
      }

      cb(null, data)
    })
  })
}

exports.save = function (file, data, cb) {
  data = JSON.stringify(data, null, 2)
  fs.writeFile(file, data + os.EOL, cb)
}
