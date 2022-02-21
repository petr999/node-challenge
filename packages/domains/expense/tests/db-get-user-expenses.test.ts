import { Connection } from '@nc/utils/dal';
import { getUserExpenses } from '../handlers/get-user-expenses';
import { mockConnection } from './utils/mocks/dal';

const emptyUserExpenses = [[], 0] as [[], number];
const fakeUserId = '98925892-8d0c-4cd3-bdbd-e2249e15900f';

describe('Get User Expenses', () => {
  let connection: Connection;
  let getRepositoryMock: jest.SpyInstance<any, unknown[]>;

  beforeEach(async () => {
    getRepositoryMock = jest.spyOn(Connection.prototype, 'getRepository');
    connection = await mockConnection();
  });

  afterEach(async () => {
    await connection?.close();
    getRepositoryMock.mockRestore();
  });

  test('getUserExpenses', async () => {
    // Arrange
    getRepositoryMock.mockImplementationOnce(() => ({
      findAndCount: () => new Promise((resolve) => resolve(emptyUserExpenses)),
    }));

    // Assess
    expect(await getUserExpenses(fakeUserId, {})).toEqual(emptyUserExpenses);
    expect(getRepositoryMock).toBeCalledTimes(1);
  });
});
