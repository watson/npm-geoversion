#!/usr/bin/env node
'use strict'

var util = require('util')
var exec = require('child_process').exec
var git = require('git-state')
var locate = require('wifi-triangulate')
var pkgio = require('package-json-io')
var bump = require('./lib/bump')
var cliPkg = require('./package')

var args = process.argv.slice(2)
var cwd = process.cwd()
var isGit = git.isGitSync(cwd)

if (isGit) {
  git.dirty(cwd, function (err, dirty) {
    if (err) return done(err)
    if (dirty > 0) return done(new Error('Git working directory not clean'))
    updatePackage()
  })
} else {
  updatePackage()
}

function updatePackage () {
  pkgio.read(function (err, pkg) {
    if (err) return done(err)

    updateVersion(pkg)

    updateLocation(pkg, function (err) {
      if (err) {
        console.error('ERROR:', err.message)
        console.error('Your wifi needs to be turned on for %s to find your location', cliPkg.name)
        console.error('If the problem persists, please open an issue at:\n\n  %s\n', cliPkg.bugs.url)
        console.error('Remember to specify your OS and hardware')
        process.exit(1)
        return
      }

      pkgio.update(pkg, function (err) {
        if (err) return done(err)

        if (isGit) {
          commit(pkg.version, function (err) {
            done(err, pkg)
          })
        } else {
          done(null, pkg)
        }
      })
    })
  })
}

function updateVersion (pkg) {
  var version = bump(pkg, args[0])

  if (!version) return usage()
  if (pkg.version === version) return done(new Error('Version not changed'))

  pkg.version = version
}

function updateLocation (pkg, cb) {
  locate(function (err, loc) {
    if (err) return cb(err)
    if (!loc) return cb(new Error('Could not find your location'))
    pkg.coordinates = [loc.lat, loc.lng]
    cb()
  })
}

function commit (version, cb) {
  var cmd = util.format('git add package.json && git commit -m "%s" && git tag v%s', version, version)
  exec(cmd, { cwd: cwd }, cb)
}

function usage () {
  console.log('Usage:')
  console.log('  %s (<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease)', cliPkg.name)
  process.exit(1)
}

function done (err, pkg) {
  if (err) {
    console.error('ERROR:', err.message)
    process.exit(1)
    return
  }
  console.log('v%s @ %s/%s', pkg.version, pkg.coordinates[0], pkg.coordinates[1])
  process.exit()
}
