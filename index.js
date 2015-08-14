#!/usr/bin/env node
'use strict'

var locate = require('wifi-triangulate')
var pkgio = require('package-json-io')
var bump = require('npm-version-bump')
var cliPkg = require('./package')

var command = process.argv.slice(2)[0]

if (!command) usage()
else bump(process.cwd(), command, precommit, done)

function precommit (cb) {
  pkgio.read(function (err, pkg) {
    if (err) return done(err)

    updateLocation(pkg, function (err) {
      if (err) {
        console.error('ERROR:', err.message)
        console.error('Your wifi needs to be turned on for %s to find your location', cliPkg.name)
        console.error('If the problem persists, please open an issue at:\n\n  %s\n', cliPkg.bugs.url)
        console.error('Remember to specify your OS and hardware')
        process.exit(1)
        return
      }

      console.log('v%s @ %s/%s', pkg.version, pkg.coordinates[0], pkg.coordinates[1])
      pkgio.update(pkg, cb)
    })
  })
}

function updateLocation (pkg, cb) {
  locate(function (err, loc) {
    if (err) return cb(err)
    if (!loc) return cb(new Error('Could not find your location'))
    pkg.coordinates = [loc.lat, loc.lng]
    cb()
  })
}

function usage () {
  console.log('%s v%s', cliPkg.name, cliPkg.version)
  console.log('Usage:')
  console.log('  %s (<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease)', cliPkg.name)
  process.exit(1)
}

function done (err, pkg) {
  if (err) {
    console.error('ERROR:', err.message)
    process.exit(1)
  }
}
