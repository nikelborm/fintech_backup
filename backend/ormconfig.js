module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  port: 5432,
  username: process.env.TYPEORM_USERNAME || 'fntch',
  password: process.env.TYPEORM_PASSWORD || '123qwe',
  database: process.env.TYPEORM_DB || 'fintech',
  synchronize: false,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  cli: {
    migrationsDir: './src/modules/infrastructure/migrations',
    entitiesDir: './src/modules/infrastructure/model',
  },
  entities: ['./dist/modules/infrastructure/model/*.model.js'],
  migrations: ['./dist/modules/infrastructure/migrations/*.js'],
  logging: 'all',
};
