// export const PrimaryGeneratedColumn = jest.fn()
// export const Column = jest.fn()
// export const Entity = jest.fn()
import { createConnection } from '@nc/utils/dal';

// export const getConnection = jest.fn().mockReturnValue({
//     query: jest.fn() // return value will be set in the test
//   })

export const mockConnection = () => createConnection({
  type: 'sqljs',
  entities: [
  ],
  logging: false,
  dropSchema: true, // Isolate each test case
  synchronize: true,
});
