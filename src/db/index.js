import pg from 'pg';
import "dotenv/config";
import { initModels } from './models.js';

const DB_NAME = process.env.DB_NAME

const start = async () => {
  const client = new pg.Client(process.env.DB_SERVER);
  await client.connect();

  const res = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`
  );

  if (res.rowCount === 0) {
      console.log(`Database ${DB_NAME} not found, creating it...`);
      await client.query(`CREATE DATABASE "${DB_NAME}";`);
      console.log(`Database ${DB_NAME} created`);
  }

  await client.end();

  await initModels();
}

export default {
  start
};