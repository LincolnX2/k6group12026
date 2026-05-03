// Payloads for K6 Performance Testing Framework

export const LOGIN_PAYLOAD = {
  email: '', // Will be filled from TEST_USERS
  password: '', // Will be filled from TEST_USERS
  // Add additional fields if required by the API
};

export const TESTIMONIAL_PAYLOAD = {
  title: 'My Automation Journey',
  content: 'Automation made easy with Ndosi Learning tutors - Bravo ! 👏',
  rating: 4.8,
  isPublic: true,
};

export const TESTIMONIAL_UPDATE_PAYLOAD = {
  title: 'Updated Automation Journey',
  content: 'Updated testimonial content - Still loving Ndosi Learning tutors! 👏',
  rating: 4.9,
};
