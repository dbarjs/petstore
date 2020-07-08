require('dotenv').config();

const port = process.env.DB_PORT || 5432;
const host = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS || 'docker';
const database = process.env.DB_NAME || 'petstore';

module.exports = [
  {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/seeds/*.ts'],
    cli: {
      migrationsDir: './src/database/seeds',
    },
  },
];
