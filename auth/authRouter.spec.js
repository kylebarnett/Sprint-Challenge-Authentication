const server = require('../api/server.js');
const request = require('supertest');
const db = require('../database/dbConfig.js');

describe('authRouter.js', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it('should return 201 ok', async () => {
    const info = {username: "something", password: "something"}
    const res = await request(server)
    .post('/api/auth/register')
    .send(info);
    expect(res.status).toBe(201)
  })

  it('should return info', async () => {
    const info = {username: "something", password: "something"}
    const bodyInfo = await request(server).post('/api/auth/register').send(info)
  })
})