// Utility functions and helpers for K6 tests

import http from 'k6/http';

/**
 * Make an HTTP request with common headers and error handling
 */
export function makeRequest(method, url, payload = null, customHeaders = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const headers = { ...defaultHeaders, ...customHeaders };
  let response;

  try {
    switch (method.toUpperCase()) {
      case 'GET':
        response = http.get(url, { headers });
        break;
      case 'POST':
        response = http.post(url, payload ? JSON.stringify(payload) : null, { headers });
        break;
      case 'PUT':
        response = http.put(url, payload ? JSON.stringify(payload) : null, { headers });
        break;
      case 'PATCH':
        response = http.patch(url, payload ? JSON.stringify(payload) : null, { headers });
        break;
      case 'DELETE':
        response = http.delete(url, { headers });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    console.error(`HTTP Request Error [${method} ${url}]: ${error.message}`);
    return null;
  }

  return response;
}

/**
 * Validate JSON response and extract data
 */
export function validateJsonResponse(response, expectedStatus = 200) {
  if (!response) {
    return { success: false, error: 'No response received' };
  }

  if (response.status !== expectedStatus) {
    console.warn(`Expected status ${expectedStatus}, got ${response.status}`);
  }

  const contentType = response.headers['Content-Type'] || '';
  if (!contentType.includes('application/json')) {
    console.error(`Response is not JSON. Content-Type: ${contentType}`);
    return { success: false, error: 'Response is not JSON', statusCode: response.status };
  }

  try {
    const data = response.json();
    return { success: true, data, statusCode: response.status };
  } catch (error) {
    console.error(`Failed to parse JSON: ${error.message}`);
    return { success: false, error: error.message, statusCode: response.status };
  }
}

/**
 * Add Bearer token to headers
 */
export function addAuthHeader(headers = {}, token) {
  return {
    ...headers,
    'Authorization': `Bearer ${token}`,
  };
}

/**
 * Log test step with consistent formatting
 */
export function logStep(stepName, details = '') {
  console.log(`[${stepName}] ${details}`);
}

/**
 * Log response details consistently
 */
export function logResponse(name, response) {
  if (response) {
    console.log(`${name} - Status: ${response.status}, Length: ${response.body.length}`);
  } else {
    console.log(`${name} - No response`);
  }
}
