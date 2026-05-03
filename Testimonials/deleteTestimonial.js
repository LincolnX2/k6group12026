import http from 'k6/http';
import { check } from 'k6';
import { CONFIG } from '../Configuration/config.js';

export function deleteTestimonial(token, testimonialId) {
  if (!testimonialId) {
    console.error('No testimonial ID provided for deletion.');
    return null;
  }

  console.log('Deleting testimonial with ID:', testimonialId);

  let response = http.del(`${CONFIG.TESTIMONIAL_DELETE_ENDPOINT_BASE}/${testimonialId}`, null, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Testimonial Delete Response Status: ' + response.status);
  console.log('Testimonial Delete Response Body: ' + response.body);

  check(response, {
    'testimonial delete status is 200': (r) => r.status === 200,
  });
}

export default deleteTestimonial;