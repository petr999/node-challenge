import { createConnection } from '@nc/utils/dal';
import { Expense } from '../../entity';

export const mockConnection = () => createConnection({
  type: 'sqljs',
  entities: [
    Expense,
  ],
  logging: true,
  dropSchema: true, // Isolate each test case
  synchronize: true,
});
