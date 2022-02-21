import config from 'config';
import { Connection, createConnection } from './dal';

let typeormConnection: Connection;

export async function dbConnect() {
  if (!typeormConnection) {
    typeormConnection = await createConnection({ ...config.db,
      type: 'postgres', username: config.db.user,
      entities: config.entities,
    });
  }
  return typeormConnection;
}
