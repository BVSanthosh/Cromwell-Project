const request = require('supertest');
const { app, server } = require('../../server');

let token;
describe('/user route tests', () => {
  // Test the POST /user/register route
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        username: 'Testing',
        email: 'Testing@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201); // Status code for created
    expect(response.body).toHaveProperty('message', 'User registration successful');
  });

  // Test the POST /user/login route
  test('should log in a user', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    const cookies = response.headers['set-cookie']; 
    token = cookies.find(cookie => cookie.startsWith('token=')).split(';')[0].split('=')[1];

    expect(response.status).toBe(200); // Status code for success
    expect(response.body).toHaveProperty('data'); // Check for the "data" property
    expect(response.body.data).toHaveProperty('email'); // Check for email inside data
    expect(response.body.data).toHaveProperty('username'); // Check for username inside data
  });

  // Test the GET /user/ route
  test('should get user data', async () => {
    const response = await request(app)
      .get('/user/')
      .set('Cookie', `token=${token}`); // Pass the token as a cookie

    expect(response.status).toBe(200); // Status code for success
    expect(response.body.data).toHaveProperty('username'); // Check username inside the "data" property
  expect(response.body.data).toHaveProperty('email'); // Check email inside the "data" property
  });
});

// Ensure the server shuts down after tests
afterAll(async () => {
    await server.close();  // Ensures the server shuts down after tests
});