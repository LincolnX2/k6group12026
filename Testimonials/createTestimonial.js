import http from 'k6/http';
import { check } from 'k6';
import { CONFIG } from '../Configuration/config.js';

export let options = {
  vus: 1,
  duration: '5s',
};

const testimonialPayload = CONFIG.TESTIMONIAL_PAYLOAD;

export function submitTestimonial(token) {
  console.log('Testimonial Payload:', JSON.stringify(testimonialPayload, null, 2));

  let response = http.post(CONFIG.TESTIMONIAL_ENDPOINT, JSON.stringify(testimonialPayload), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Testimonial Response Status: ' + response.status);
  console.log('Testimonial Response Body: ' + response.body);

  check(response, {
    'testimonial status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  return response;
}

export default submitTestimonial;
