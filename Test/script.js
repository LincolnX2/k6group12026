import { sleep } from 'k6';
import { CONFIG } from '../Configuration/config.js';
import { login } from '../UserAuth/login.js';
import { getProfile } from '../UserProfile/getProfile.js';
import { submitTestimonial } from '../Testimonials/createTestimonial.js';
import { updateTestimonial } from '../Testimonials/updateTestimonial.js';
import { deleteTestimonial } from '../Testimonials/deleteTestimonial.js';

export let options = CONFIG.LOAD_OPTIONS;

export default function () {
  // Use a random user from config
  let user = CONFIG.TEST_USERS[Math.floor(Math.random() * CONFIG.TEST_USERS.length)];

  let token = login(user.email, user.password);

  if (!token) {
    console.log('Skipping profile and testimonial flow because login failed.');
    return;
  }

  let profile = getProfile(token);
  let createResponse = submitTestimonial(token);

  function findId(obj) {
    if (!obj || typeof obj !== 'object') {
      return null;
    }

    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === 'id' && typeof obj[key] === 'string') {
        return obj[key];
      }
    }

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (value && typeof value === 'object') {
        const nestedId = findId(value);
        if (nestedId) {
          return nestedId;
        }
      }
    }

    return null;
  }

  let testimonialId = null;
  if (createResponse && (createResponse.status === 200 || createResponse.status === 201)) {
    try {
      const json = createResponse.json();
      testimonialId = findId(json);
      console.log('Created testimonial ID:', testimonialId);
    } catch (e) {
      console.warn('Unable to parse testimonial creation response JSON:', e.message);
    }
  }

  if (!testimonialId) {
    console.log('No testimonial ID extracted; skipping update and delete.');
    sleep(1);
    return;
  }

  updateTestimonial(token, testimonialId);
  deleteTestimonial(token, testimonialId);

  sleep(1);
}