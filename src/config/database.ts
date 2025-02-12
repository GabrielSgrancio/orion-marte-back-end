import { DataSource } from 'typeorm';

export const MysqlDataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  database: process.env.DB_DATABASE,
  url: process.env.DB_CONNECTION_STRING,
  entities: ['src/entity/*.ts', 'entity/*.js'],
  migrations: ['src/migration/*.ts', 'migration/*.js'],
  logging: true,
  synchronize: true,
  migrationsRun: false
});
