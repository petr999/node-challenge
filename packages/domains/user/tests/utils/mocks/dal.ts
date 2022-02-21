import { createConnection } from '@nc/utils/dal';

export const mockConnection = () => createConnection({
  type: 'sqljs',
  entities: [
  ],
  logging: false,
  dropSchema: true, // Isolate each test case
  synchronize: true,
});
