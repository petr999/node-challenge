import { Client } from 'pg';
import config from 'config';
import { Connection } from 'typeorm';

export let dbConnection : {
  typeOrm?: Connection,
  [k: string]: any,
}={};

export function connect() {
  dbConnection.client = new Client(config.db);
  return dbConnection.client.connect();
}

export async function query(queryString: string, parameters?: any) {
  try {
    if (!dbConnection.client) await connect();
  } catch (e) {
    dbConnection.client = undefined;
    throw e;
  }

  console.log(await dbConnection.typeOrm.query(queryString, parameters))

  return await dbConnection.typeOrm.query(queryString, parameters);
}
