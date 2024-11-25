const request = require('supertest');
const { app, server } = require('../../server');

let token; // To store the token retrieved after login

// Run before each test
beforeEach(async () => {
  // Log in a user to get the token
  const loginResponse = await request(app)
    .post('/user/login')
    .send({
      email: 'test@example.com',
      password: 'password123',
    });

  // Assuming the token is in the 'set-cookie' header
  const cookies = loginResponse.headers['set-cookie'];
  token = cookies.find(cookie => cookie.startsWith('token=')).split(';')[0].split('=')[1];
});

describe('/proucts route tests', () => {
  // Test the GET /products route
  test('should get a list of products', async () => {
    const response = await request(app)
      .get('/products/')
      .set('Cookie', `token=${token}`); // Set the token as a cookie

    expect(response.status).toBe(200); // Status code for success
    expect(Array.isArray(response.body.data)).toBe(true); // Expecting an array of products
    expect(response.body.data.length).toBeGreaterThan(0); // Check if the array is not empty
  });

  // Test the GET /products/:imageName route
  test('should get product image by name', async () => {
    const imageName = 'laptops/dell_xps_13.jpg';
    const response = await request(app)
      .get(`/products/${imageName}`)
      .set('Cookie', `token=${token}`); // Set the token as a cookie

    expect(response.status).toBe(200); // Status code for success
    expect(response.headers['content-type']).toContain('image/jpeg'); // Check for image content type
  });
});

// Ensure the server shuts down after tests
afterAll(async () => {
  await server.close();  // Ensures the server shuts down after tests
});