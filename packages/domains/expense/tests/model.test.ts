import * as dbUser from '../../user/model';
import * as dbUserExpenses from '../data/db-user-expenses';
import { getUserExpenses } from '../model';
import { NotFound } from '@nc/utils';

const emptyUserExpenses = [[], 0] as [[], number];
const [emptyUserId, badUserId] = ['', '012345-678-9012'];
const userIdUuid = '097f1e8a-933f-4bb0-9ded-9f54a839074c';

const sampleUser = { id: userIdUuid,
  first_name: '',
  last_name: '',
  company_name: '',
  ssn: '',
};

const readUserExpensesMock = jest.spyOn(dbUserExpenses, 'readUserExpenses');
const getUserDetailsMock = jest.spyOn(dbUser, 'getUserDetails');

describe('Get User Expenses', () => {
  beforeEach(() => {
    readUserExpensesMock.mockImplementation(() => new Promise((resolve) => resolve(emptyUserExpenses)));
    getUserDetailsMock.mockImplementation(() => new Promise((resolve) => resolve(sampleUser)));
  });

  afterEach(() => {
    getUserDetailsMock.mockRestore();
    readUserExpensesMock.mockRestore();
  });

  test('get expenses of non-uuid user', async () => {
    readUserExpensesMock.mockImplementation(() => new Promise((resolve) => resolve(emptyUserExpenses)));
    getUserDetailsMock.mockImplementation(() => new Promise((resolve) => resolve(sampleUser)));

    expect(await getUserExpenses(badUserId, {})).toEqual(emptyUserExpenses);
    expect(getUserDetailsMock).toBeCalledTimes(1);
    expect(readUserExpensesMock).toBeCalledTimes(1);
  });
  test('get expenses of empty user', async () => {
    readUserExpensesMock.mockImplementation(() => new Promise((resolve) => resolve(emptyUserExpenses)));
    getUserDetailsMock.mockImplementation(() => new Promise((resolve, reject) => reject(NotFound)));
    try {
      await getUserExpenses(emptyUserId, {});
      expect(() => {}).toThrow(); // should throw on previous line
    } catch (e) {
      expect(e.status).toBe(400);
    }

    expect(getUserDetailsMock).toBeCalledTimes(0);
    expect(readUserExpensesMock).toBeCalledTimes(0);
  });
});
