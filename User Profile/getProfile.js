import http from 'k6/http';
import { check } from 'k6';
import { CONFIG } from '../Configuration/config.js';
import { login } from '../User Authentication/login.js';

export function getProfile(token) {
  console.log('getProfile function called successfully');

  let response = http.get(CONFIG.PROFILE_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log('Get Profile Response Status: ' + response.status);
  console.log('Get Profile Response Body: ' + response.body);

  check(response, {
    'profile status is 200': (r) => r.status === 200,
  });

  return response;
}

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  let user = CONFIG.TEST_USERS[Math.floor(Math.random() * CONFIG.TEST_USERS.length)];
  let token = login(user.email, user.password);

  if (!token) {
    console.log('No token returned from login; skipping profile request.');
    return;
  }

  getProfile(token);
}