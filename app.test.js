const request = require('supertest');
const { app, createScenario } = require('./app.js');

describe('Test utility functions', () => {
  test('Ensure that created scenario includes inputs', () => {
    const scenario = createScenario('Testing1', 'Testing2', 'Testing3');

    expect(scenario).toContain('Testing1');
    expect(scenario).toContain('Testing2');
    expect(scenario).toContain('Testing3');
  });
});

describe('Test API GET methods', () => {
  test('Root successfully returns html', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  });

  test('Not root redirects to root', async () => {
    const res = await request(app).get('/abcdef');

    expect(res.status).toBe(302);
    expect(res.text).toContain('Redirecting to /');
  });
});

describe('Test API POST methods', () => {
  test('Fails if any of the inputs is falsy', async () => {
    const res = await request(app).post('/').send({
      environment: 'Testing',
      role: 'Testing',
      technology: '',
    });

    expect(res.status).toBe(400);
  });

  test('Fails if any of the inputs is missing', async () => {
    const res = await request(app).post('/').send({
      environment: 'Testing',
      role: 'Testing',
    });

    expect(res.status).toBe(400);
  });

  test('Succeed if information is entered correctly', async () => {
    const res = await request(app).post('/').send({
      environment: 'Testing',
      role: 'Testing',
      technology: 'Testing',
    });

    expect(res.status).toBe(200);
  });

  test('Successful response should contain original inputs', async () => {
    const input = {
      environment: 'Testing',
      role: 'Testing',
      technology: 'Testing',
    };

    const res = await request(app).post('/').send(input);

    expect(res.status).toBe(200);
    expect(res.text).toContain(JSON.stringify(input));
  });
});
