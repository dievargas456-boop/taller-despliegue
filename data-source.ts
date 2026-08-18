import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/users/entities/user.entity';

let databaseConfig: DataSourceOptions;

if (process.env.DATABASE_URL) {
  databaseConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,

    ssl: {
      rejectUnauthorized: false,
    },

    entities: [User],

    migrations: ['src/database/migrations/*.ts'],

    synchronize: false,
  };
}else{
  databaseConfig = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'rootpassword',
    database: process.env.POSTGRES_DB || 'auth_db',
    entities: [User],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
  };
}

export const AppDataSource = new DataSource(databaseConfig);