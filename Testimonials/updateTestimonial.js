import http from 'k6/http';
import { check } from 'k6';
import { CONFIG } from '../Configuration/config.js';

export let options = {
  vus: 1,
  duration: '5s',
};

const testimonialUpdatePayload = CONFIG.TESTIMONIAL_UPDATE_PAYLOAD;

export function updateTestimonial(token, testimonialId) {
  if (!testimonialId) {
    console.error('No testimonial ID provided for update.');
    return null;
  }

  console.log('Testimonial Payload:', JSON.stringify(testimonialUpdatePayload, null, 2));

  let response = http.put(`${CONFIG.TESTIMONIAL_UPDATE_ENDPOINT_BASE}/${testimonialId}`, JSON.stringify(testimonialUpdatePayload), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });       

    console.log('Testimonial Update Response Status: ' + response.status);  
    console.log('Testimonial Update Response Body: ' + response.body);

  check(response, {
    'testimonial update status is 200': (r) => r.status === 200,
  });
}

export default updateTestimonial;
