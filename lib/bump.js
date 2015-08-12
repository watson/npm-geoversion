'use strict'

var semver = require('semver')

module.exports = function (pkg, versionStr) {
  var version = semver.valid(versionStr)
  if (!version) version = semver.inc(pkg.version, versionStr)
  return version
}
