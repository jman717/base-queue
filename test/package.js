const assert = require('assert'),
    jsonHasDifferences = require('diffler'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "Jim Manton"
  },
  "version": "3.0.3",
  "bundleDependencies": [],
  "dependencies": {
    "chai": "^5.0.0",
    "colors": "^1.4.0",
    "diffler": "^2.0.4",
    "fs": "^0.0.1-security",
    "log-queue": "^3.0.3",
    "mocha": "^10.2.0",
    "valid-path": "^2.1.0"
  },
  "scripts": {
    "start": "node app.ts",
    "test": "mocha",
    "ditched": "ditched -a",
    "test_base": "node ./tests/base",
    "json_base": "node ./tests/json",
    "http_base": "node ./tests/http_base",
    "http_json_base": "node ./tests/http_json",
    "json_version_matching": "node ./tests/json_version",
    "json_version_non_matching": "node ./tests/json_version_non_matching",
    "json_name_matching": "node ./tests/json_name",
    "json_name_non_matching": "node ./tests/json_name_non_matching",
    "json_status_matching": "node ./tests/json_status",
    "json_status_non_matching": "node ./tests/json_status_non_matching"
  },
  "keywords": [
    "queue",
    "processing",
    "appenders",
    "javascript",
    "synchronous",
    "objects",
    "promises",
    "mocha"
  ],
  "homepage": "https://github.com/jman717/base-queue",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jman717/base-queue.git"
  },
  "deprecated": false,
  "description": "Logging to console with eventual log4js-tagline support.",
  "email": "jrman@risebroadband.net",
  "license": "MIT",
  "main": "app.js",
  "name": "base-queue",
  "start": "node app.js"
}

describe('package.json', function () {
    it('should pass', function () {
      const difference = jsonHasDifferences(packagejson, packageMock)
      assert(JSON.stringify(difference) == "{}")
    })

    it('should fail', function () {
        packageMock.version = '0'
        assert(jsonHasDifferences(packagejson, packageMock))
    })
})
