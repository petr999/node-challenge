import { Client } from 'pg';
import config from 'config';

let db;

export function connect() {
  db = new Client(config.db);
  return db.connect();
}

export async function query(queryString: string, parameters?: any) {
  try {
    if (!db) await connect();
  } catch (e) {
    db = undefined;
    throw e;
  }

  return db.query(queryString, parameters);
}
