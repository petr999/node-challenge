import { Connection } from '@nc/utils/dal';
import { dbHealthcheck } from '../data/db-healthcheck';
import { mockConnection } from './utils/mocks/dal';

let connection: Connection;
let queryMock: jest.SpyInstance<any, unknown[]>;

beforeEach(async () => {
  queryMock = jest.spyOn(Connection.prototype, 'query');
  connection = await mockConnection();
});

afterEach(async () => {
  await connection.close();
  queryMock.mockRestore();
});

describe('db-healthcheck', () => {
  test('Happy health check returns true', async () => {
    queryMock.mockImplementationOnce(() => new Promise((resolve) => resolve([{ col: 1 }])));

    expect(await dbHealthcheck()).toEqual([true, '']);
    expect(queryMock).toBeCalledTimes(1);
  });
  test('Unhappy health check returns false', async () => {
    queryMock.mockImplementationOnce(() => []);
    expect(await dbHealthcheck()).toEqual([false, '']);
    expect(queryMock).toBeCalledTimes(1);
  });
});
