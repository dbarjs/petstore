import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';

import createConnection from '../database';

import Product from '../models/Product';

import app from '../app';
import User from '../models/User';

let connection: Connection;

const PRODUCTS = [
  {
    name: 'POTTY PADS',
    description:
      'Enter Kahoots potty pad! Now you can train to go where you want or just toss a few down in your travel crate to keep the back seat dry.',
    category: 'Supplies',
    price: 9.99,
    quantity: 99,
  },
  {
    name: 'SALMON OIL',
    description:
      'Better yet, we utilize a special filtration process that helps remove the fishy smell, but not the yummy taste that pets love.',
    category: 'Supplies',
    price: 1.99,
    quantity: 99,
  },
  {
    name: 'Freeze-dried Raw Lamb Formula',
    description:
      'Better yet, we utilize a special filtration process that helps remove the fishy smell, but not the yummy taste that pets love.',
    category: 'Supplies',
    price: 99.99,
    quantity: 99,
  },
] as Product[];

const USER = {
  name: 'Test User',
  email: 'test@test.com',
  password: '123456',
} as User;

interface SessionProps {
  email: string;
  password: string;
}

async function createSessionToken({
  email,
  password,
}: SessionProps): Promise<string> {
  const { body } = await request(app).post('/sessions').send({
    email,
    password,
  });
  return body.token;
}

function createHeader(token: string): object {
  return {
    Authorization: `Bearer ${token}`,
  };
}

describe('Product', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();

    await request(app).post('/users').send(USER);
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM products');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list products', async () => {
    const sessionToken = await createSessionToken(USER);
    const header = createHeader(sessionToken);

    await request(app).post('/products').send(PRODUCTS[0]).set(header);
    await request(app).post('/products').send(PRODUCTS[1]).set(header);
    await request(app).post('/products').send(PRODUCTS[2]).set(header);

    const response = await request(app).get('/products').set(header);

    expect(response.body.products).toHaveLength(3);
  });

  it('should be able to create new product', async () => {
    const productsRepository = getRepository(Product);

    const sessionToken = await createSessionToken(USER);
    const header = createHeader(sessionToken);

    const response = await request(app)
      .post('/products')
      .send(PRODUCTS[0])
      .set(header);

    const product = await productsRepository.find();

    expect(product).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should not to be able to create new product with invalid token', async () => {
    const productsRepository = getRepository(Product);

    const header = createHeader('invalid token');

    const { status } = await request(app)
      .post('/products')
      .send(PRODUCTS[0])
      .set(header);

    expect(status).toBe(401);

    const product = await productsRepository.find();

    expect(product.length).toBe(0);
  });

  it('should be able to create pagination', async () => {
    const sessionToken = await createSessionToken(USER);
    const header = createHeader(sessionToken);

    await request(app).post('/products').send(PRODUCTS[0]).set(header);
    await request(app).post('/products').send(PRODUCTS[1]).set(header);
    await request(app).post('/products').send(PRODUCTS[1]).set(header);

    const { body } = await request(app)
      .get('/products?per_page=1&page=1')
      .set(header);

    expect(true);
  });

  it('should be able to filter by string', async () => {
    const sessionToken = await createSessionToken(USER);
    const header = createHeader(sessionToken);

    await request(app).post('/products').send(PRODUCTS[0]).set(header);
    await request(app).post('/products').send(PRODUCTS[1]).set(header);
    await request(app).post('/products').send(PRODUCTS[1]).set(header);

    const { body } = await request(app).get('/products?q=Kahoots').set(header);

    expect(body.total_count).toBe(1);
  });
});
