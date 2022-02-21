import { createConnection } from '@nc/utils/dal';
import { ExpenseTestableBySqlJs } from '../../../entity';

export const mockConnection = () => createConnection({
  type: 'sqljs',
  entities: [
    ExpenseTestableBySqlJs,
  ],
  logging: false,
  dropSchema: true, // Isolate each test case
  synchronize: true,
});
