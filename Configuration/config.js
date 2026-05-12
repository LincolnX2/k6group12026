// Configuration for K6 Performance Testing Framework

import { LOGIN_PAYLOAD, TESTIMONIAL_PAYLOAD, TESTIMONIAL_UPDATE_PAYLOAD } from '../Payload/payloads.js';

export const CONFIG = {
  BASE_URL: 'https://ndosiautomation.co.za',
  LOGIN_ENDPOINT: 'https://www.ndosiautomation.co.za/APIDEV/login', // Updated to full URL
  PROFILE_ENDPOINT: 'https://www.ndosiautomation.co.za/APIDEV/profile',
  TESTIMONIAL_ENDPOINT: 'https://www.ndosiautomation.co.za/APIDEV/testimonials',
  TESTIMONIAL_APPROVED_ENDPOINT_BASE: 'https://www.ndosiautomation.co.za/APIDEV/admin/testimonials',
  TESTIMONIAL_UPDATE_ENDPOINT_BASE: 'https://www.ndosiautomation.co.za/APIDEV/testimonials', // Base URL for update, append /{id} when updating
  TESTIMONIAL_DELETE_ENDPOINT_BASE: 'https://www.ndosiautomation.co.za/APIDEV/testimonials', // Base URL for delete, append /{id} when deleting

  LOGIN_PAYLOAD,
  TESTIMONIAL_PAYLOAD,
  TESTIMONIAL_UPDATE_PAYLOAD,
  TEST_USERS: [
    { email: 'hurri.cane@gmail.com', password: 'cane@123' },
    //{ email: 'user2@example.com', password: 'pass2' },
    // Add more users for different scenarios
  ],
  LOAD_OPTIONS: {
    vus: 1,
    duration: '10s',
  },
};