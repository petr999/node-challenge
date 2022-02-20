import config from 'config';
import { Connection, createConnection } from 'typeorm';

let
  typeormConnection:
   Connection;
export async function dbConnect() {
  if (!typeormConnection) {
    typeormConnection = await createConnection({ ...config.db,
      type: 'postgres', username: config.db.user });
  }
  return typeormConnection;
}

export async function query(queryString: string, parameters?: any) {
  try {
    if (!typeormConnection.isConnected) dbConnect();
  } catch (e) {
    typeormConnection = undefined;
    throw e;
  }
  return typeormConnection.query(queryString, parameters);
}
