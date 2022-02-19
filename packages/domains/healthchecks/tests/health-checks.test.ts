import * as db from '@nc/utils/db';
import { dbHealthcheck } from '../data/db-healthcheck';

const queryMock = jest.spyOn(db, 'query');

afterEach(() => {
  queryMock.mockClear();
});

describe('db-healthcheck', () => {
  test('Happy health check returns true', async () => {
    queryMock.mockImplementationOnce(() => new Promise((resolve) => resolve({
      rows: [{ col: 1 }], rowCount: 1, command: '', oid: 1, fields: [],
    })));
    expect(await dbHealthcheck()).toEqual([true, '']);
    expect(db.query).toBeCalledTimes(1);
  });
  test('Unhappy health check returns false', async () => {
    queryMock.mockImplementationOnce(() => new Promise((resolve) => resolve({
      rows: [], rowCount: 0, command: '', oid: 1, fields: [],
    })));
    expect(await dbHealthcheck()).toEqual([false, '']);
    expect(db.query).toBeCalledTimes(1);
  });
});
