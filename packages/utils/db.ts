import config from 'config';
import path from 'path';
import { Connection, createConnection } from 'typeorm';

let typeormConnection: Connection;

export async function dbConnect() {
  if (!typeormConnection) {
    typeormConnection = await createConnection({ ...config.db,
      type: 'postgres', username: config.db.user,
      entities: [
        path.resolve(__dirname, '../**/entity/*.{ts,js}'),
      ],
    });
  }
  return typeormConnection;
}

export async function query(queryString: string, parameters?: any) {
  try {
    if (!typeormConnection.isConnected) await dbConnect();
  } catch (e) {
    typeormConnection = undefined;
    throw e;
  }
  return typeormConnection.query(queryString, parameters);
}
