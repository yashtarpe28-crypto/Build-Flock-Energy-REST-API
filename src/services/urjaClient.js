/*
 * Legacy portal adapter.
 *
 * IMPORTANT: The actual portal login and data endpoints must be discovered in
 * Chrome DevTools > Network while using the authorized assignment account.
 * Do not guess endpoint paths or commit cookies/tokens. Once discovered, put
 * the request details in this module and document them in PROTOCOL.md.
 */

const axios = require('axios');

const baseURL = process.env.URJA_BASE_URL;
const timeout = Number(process.env.UPSTREAM_TIMEOUT_MS) || 15000;

function notImplemented(resource) {
  const error = new Error(
    `Portal integration for "${resource}" is not configured yet. Inspect the portal Network requests and implement the observed protocol in src/services/urjaClient.js.`
  );
  error.status = 501;
  error.code = 'UPSTREAM_INTEGRATION_NOT_CONFIGURED';
  return error;
}

function createHttpClient() {
  if (!baseURL) {
    const error = new Error('URJA_BASE_URL is missing. Copy .env.example to .env and configure it.');
    error.status = 500;
    error.code = 'CONFIGURATION_ERROR';
    throw error;
  }

  return axios.create({
    baseURL,
    timeout,
    headers: { Accept: 'application/json, text/html;q=0.9, */*;q=0.8' },
    maxRedirects: 5
  });
}

async function listMeters() {
  createHttpClient();
  throw notImplemented('meter listing');
}

async function getMeter(id) {
  if (!id || !String(id).trim()) {
    const error = new Error('A meter ID is required.');
    error.status = 400;
    error.code = 'INVALID_METER_ID';
    throw error;
  }
  createHttpClient();
  throw notImplemented('meter details');
}

async function getMeterConsumption(id, _range = {}) {
  if (!id || !String(id).trim()) {
    const error = new Error('A meter ID is required.');
    error.status = 400;
    error.code = 'INVALID_METER_ID';
    throw error;
  }
  createHttpClient();
  throw notImplemented('meter consumption');
}

async function getHierarchy() {
  createHttpClient();
  throw notImplemented('hierarchy');
}

module.exports = { listMeters, getMeter, getMeterConsumption, getHierarchy };
