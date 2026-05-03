import { makeRequest, validateJsonResponse, logStep, logResponse } from '../Utilities/utils.js';
import { CONFIG } from '../Configuration/config.js';

export function login(email, password) {
  const payload = {
    ...CONFIG.LOGIN_PAYLOAD,
    email,
    password,
  };

  logStep('LOGIN', `Attempting login for ${email}`);

  const response = makeRequest('POST', CONFIG.LOGIN_ENDPOINT, payload);
  logResponse('Login Response', response);

  if (!response) {
    logStep('LOGIN_ERROR', 'No response from server');
    return null;
  }

  const validation = validateJsonResponse(response, 200);
  if (!validation.success) {
    logStep('LOGIN_ERROR', `JSON validation failed: ${validation.error}`);
    return null;
  }

  // Extract token from nested structure: data.data.token
  const token = validation.data?.data?.token;
  if (token) {
    logStep('LOGIN_SUCCESS', 'Token extracted');
  } else {
    logStep('LOGIN_WARNING', 'No token in response');
  }

  return token;
}

export let options = {
  vus: 1,
  duration: '5s',
};

export default function () {
  const user = CONFIG.TEST_USERS[Math.floor(Math.random() * CONFIG.TEST_USERS.length)];
  login(user.email, user.password);
}