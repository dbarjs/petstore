require('dotenv').config();

const host = process.env.DB_HOST || 'localhost';

module.exports = [
  {
    type: 'postgres',
    host,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/seeds/*.ts'],
    cli: {
      migrationsDir: './src/database/seeds',
    },
  },
];
