'use strict'

var os = require('os')
var fs = require('fs')
var path = require('path')
var test = require('tape')
var pkglib = require('../lib/package')

var pkgFile = path.join('test', '_test-package.json')

test('pkglib.read', function (t) {
  pkglib.read(pkgFile, function (err, pkg) {
    t.error(err)
    t.equal(pkg.name, 'testing')
    t.end()
  })
})

test('pkglib.save', function (t) {
  var file = path.join(os.tmpdir(), 'package.json')
  var now = Date.now()
  var pkg = { foo: now }
  pkglib.save(file, pkg, function (err) {
    t.error(err)
    fs.readFile(file, function (err, data) {
      data = JSON.parse(data)
      t.equal(data.foo, now)
      t.end()
    })
  })
})
