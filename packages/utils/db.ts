import { Client } from 'pg';
import config from 'config';

let dbConnection: Client;

export function connect() {
  dbConnection = new Client(config.db);
  return dbConnection.connect();
}

export async function query(queryString: string, parameters?: any) {
  try {
    if (!dbConnection) await connect();
  } catch (e) {
    dbConnection = undefined;
    throw e;
  }

  return dbConnection.query(queryString, parameters);
}
