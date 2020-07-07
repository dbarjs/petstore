module.exports = [
  {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'petstore',
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'petstore',
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/seeds/*.ts'],
    cli: {
      migrationsDir: './src/database/seeds',
    },
  },
];
