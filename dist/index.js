module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(811);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 132:
/***/ (function(module) {

module.exports = eval("require")("jsonwebtoken");


/***/ }),

/***/ 811:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(889);

// Create a token without the client
const jwt = __webpack_require__(132);
const axios = __webpack_require__(813);

const METHOD_POST = 'POST';
const METHOD_GET = 'GET';

const key = core.getInput('key', { required: true});

// Split the key into ID and SECRET
const [id, secret] = key.split(':');

// Create the token (including decoding secret)
const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
  keyid: id,
  algorithm: 'HS256',
  expiresIn: '5m',
  audience: `/v3/admin/`
});

const headers = { 'Authorization': `Ghost ${token}` }

core.debug('Parse this dammit')

const instanceConfig = {
  baseURL: core.getInput('url', { required: true }),
  timeout: parseInt(core.getInput('timeout') || 5000, 10),
  headers: { ...headers }
}

core.debug('Instance Configuration: ' + JSON.stringify(instanceConfig))

const instance = axios.create(instanceConfig);

(async () => {
  try {
    const method = core.getInput('method') || METHOD_POST;
    const data = method === METHOD_GET ? undefined : JSON.parse(core.getInput('data') || '{}')

    const requestData = {
      method,
      data
    }

    core.debug('Request Data: ' + JSON.stringify(requestData))

    const response = await instance.request(requestData)

    core.setOutput('response', JSON.stringify(response.data))
  } catch (error) {
    core.setFailed(JSON.stringify({ code: error.response.code, message: error.response.data }))
  }
})()

/* // Make an authenticated request to create a post
const url = core.getInput('url', { required: true });
const headers = { Authorization: `Ghost ${token}` };
const payload = core.getInput('data', { required: true });

axios.post(url, payload, { headers })
    .then(response => console.log(response))
    .catch(error => console.error(error)); */


/***/ }),

/***/ 813:
/***/ (function(module) {

module.exports = eval("require")("axios");


/***/ }),

/***/ 889:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ });