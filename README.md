# npm-geoversion

Bump the version of your npm module **and** automatically tag it with
your current geo-coordinates. Combines the power of
[geopkg](https://github.com/watson/geopkg) with the `npm version`
command in one simple command: `npm-geoversion`

[![Build status](https://travis-ci.org/watson/npm-geoversion.svg?branch=master)](https://travis-ci.org/watson/npm-geoversion)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install -g npm-geoversion
```

## Usage

When ever you want to bump the version of your npm module, just run:

```
npm-geoversion <newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease
```

This will do exactly the same as [`npm
version`](https://docs.npmjs.com/cli/version) plus add your current
position on planet earth to the package.json file:

```js
{
  "coordinates": [55.8079696, 12.502925]
}
```

### Example:

To bump the patch version of your module, run:

```
npm-geoversion patch
```

## License

MIT
