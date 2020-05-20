const core = require("@actions/core");

// Create a token without the client
const jwt = require('jsonwebtoken');
const axios = require('axios');

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
