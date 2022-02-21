import { Connection } from '@nc/utils/dal';
import { mockConnection } from './utils/mocks/dal';
import { readUser } from '../data/db-user';

const sampleUser = { first_name: 'Sample', last_name: 'User', company_name: 'tehcompany' };

let queryMock: jest.SpyInstance<any, unknown[]>;
let connection: Connection;

beforeEach(async () => {
  queryMock = jest.spyOn(Connection.prototype, 'query');
  connection = await mockConnection();
});

afterEach(async () => {
  await connection.close();
  queryMock.mockRestore();
});

describe('db-user', () => {
  test('Happy user read returns true', async () => {
    queryMock.mockImplementationOnce(() => new Promise((resolve) => resolve([sampleUser])));

    expect(await readUser('f64afaed-6d30-4be5-b7cb-422799a1a406')).toEqual(sampleUser);
    expect(queryMock).toBeCalledTimes(1);
  });
  test('Unhappy user read returns false', async () => {
    queryMock.mockImplementationOnce(() => new Promise((resolve) => resolve([])));
    expect(await readUser('f64afaed-6d30-4be5-b7cb-422799a1a406')).toBeUndefined();
    expect(queryMock).toBeCalledTimes(1);
  });
});
