'use strict'

var test = require('tape')
var bump = require('../lib/bump')

test('bump 1.2.3', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, '1.2.3')
  t.equal(version, '1.2.3')
  t.end()
})

test('bump patch', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'patch')
  t.equal(version, '1.1.2')
  t.end()
})

test('bump minor', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'minor')
  t.equal(version, '1.2.0')
  t.end()
})

test('bump major', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'major')
  t.equal(version, '2.0.0')
  t.end()
})

test('bump prepatch', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'prepatch')
  t.equal(version, '1.1.2-0')
  t.end()
})

test('bump preminor', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'preminor')
  t.equal(version, '1.2.0-0')
  t.end()
})

test('bump premajor', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'premajor')
  t.equal(version, '2.0.0-0')
  t.end()
})

test('bump prerelease', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'prerelease')
  t.equal(version, '1.1.2-0')
  t.end()
})

test('bump patch with no version', function (t) {
  var pkg = {}
  var version = bump(pkg, 'patch')
  t.equal(version, null)
  t.end()
})

test('bump invalid', function (t) {
  var pkg = { version: '1.1.1' }
  var version = bump(pkg, 'invalid')
  t.equal(version, null)
  t.end()
})
