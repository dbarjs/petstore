import { Connection, createConnection } from 'typeorm';
import User from '../models/User';
import Product from '../models/Product';

export default async (name = 'default'): Promise<Connection> => {
  return createConnection({
    name,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    entities: [User, Product],
    migrations: ['./src/database/migrations/*.ts'],
    database: process.env.NODE_ENV === 'test' ? 'petstore_tests' : 'petstore',
  });
};
