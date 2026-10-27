const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/server');

let server;
let origin;

test('start API test server', async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  assert.ok(origin);
});

test('GET /health returns healthy status', async () => {
  const response = await fetch(`${origin}/health`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, 'ok');
  assert.equal(body.service, 'Flock Energy API');
});

test('unknown routes return JSON 404', async () => {
  const response = await fetch(`${origin}/does-not-exist`);
  assert.equal(response.status, 404);
  const body = await response.json();
  assert.equal(body.error.code, 'NOT_FOUND');
});

test('invalid consumption date returns 400', async () => {
  const response = await fetch(`${origin}/api/v1/meters/example/consumption?from=not-a-date`);
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error.code, 'INVALID_DATE');
});

test('close API test server', async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});
