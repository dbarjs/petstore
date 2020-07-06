import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

import createConnection from '../database';
import authConfig from '../config/auth';

import app from '../app';
import User from '../models/User';

let connection: Connection;

const USER = {
  name: 'Test User',
  email: 'test@test.com',
  password: '123456',
} as User;

interface SessionProps {
  email: string;
  password: string;
}

describe('User', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('shoud be able to register a user', async () => {
    const { body: newUser } = await request(app).post('/users').send(USER);

    expect(newUser.id).toBeTruthy();
    expect(newUser.email).toMatch(USER.email);
  });

  it('shoud not to be able to register a user with already used email', async () => {
    await request(app).post('/users').send(USER);
    const { status } = await request(app).post('/users').send(USER);

    expect(status).toBe(400);
  });

  it('shoud be able to create a valid session token', async () => {
    await request(app).post('/users').send(USER);

    const { body } = await request(app).post('/sessions').send({
      email: USER.email,
      password: USER.password,
    });

    expect(verify(body.token, authConfig.jwt.secret)).toBeTruthy();
  });
});
