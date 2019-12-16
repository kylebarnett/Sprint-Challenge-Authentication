const server = require('./server.js');
const request = require('supertest');

describe('server.js', () => {
  test('should be the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })
})