// // import { conductGetUserExpenses, getFindArgs } from '../../conductors';

import { BadRequest, Like } from '@nc/utils';
import { conductOptions, getFindArgs, getWhere, getWhereAmountPartial, getWhereMerchantName } from '../../conducts';

describe('Handle invalid Request', () => {
  test('Return error on empty Request', () => {
    const req = { params: {}, query: {} };

    const [findArgs, conductError, userId] = [{}, BadRequest('User: not set'), undefined];
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
});

describe('Take user id from Request to Options', () => {
  test('Take user id Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: {} };
    const [findArgs, conductError, userId] = [{}, undefined, req.params.userId];
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
});

describe('Take "currency" from Request to findAndCount() arguments', () => {
  test('Take "currency" to "where" from Request, skip "bogus" from "where"', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { currency: 'DKK', notknown: 'bogus' } } };
    const [findArgs, conductError, userId] = [{ where: { currency: 'DKK' } }, undefined, req.params.userId];

    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });

  test('Take "currency" object to "where" as string from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { currency: { DKK: 'KKD' }, notknown: 'bogus' } } };
    const [findArgs, conductError, userId] = [{ where: { } }, undefined, req.params.userId];

    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
});

describe('Take "merchantName" from Request to findAndCount() arguments', () => {
  test('Take "merchantName" string to "where" as is from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { merchantName: 'Donkey Republic' } } };
    const [findArgs, conductError, userId] = [{ where: { merchantName: 'Donkey Republic' } }, undefined, req.params.userId];

    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });

  test('Take "merchantName" string to "where", skipping "bogus" as is from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { merchantName: 'Donkey Republic', notknown: 'bogus' } } };
    const [findArgs, conductError, userId] = [{ where: { merchantName: 'Donkey Republic' } }, undefined, req.params.userId];

    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });

  test('Not take "merchantName" object to "where" as is from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { merchantName: { short: 'Donkey Republic' } } } };
    const [findArgs, conductError, userId] = [{ where: { } }, undefined, req.params.userId];

    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });

  test('Take "merchantName" string to "where" as wildcard from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { merchantName: 'Donkey*' } } };
    const [findArgs, conductError, userId] = [{ where: { merchantName: Like('Donkey%') } }, undefined, req.params.userId];

    expect(getWhereMerchantName(req.query.where.merchantName)).toEqual(findArgs.where.merchantName);
    expect(getWhere(req.query.where)).toEqual({ merchantName: findArgs.where.merchantName });
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
});

describe('Take "amount" from Request to findAndCount() arguments', () => {
  test('Take "amount" string to "where" in cents from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { amount: '44.5' } } };
    const [findArgs, conductError, userId] = [{ where: { amountInCents: 4450 } }, undefined, req.params.userId];
    const [where, whereExpected] = [{}, { amountInCents: 4450 }];

    expect(() => { getWhereAmountPartial('amount', 44.5, where); }).not.toThrowError();
    expect(where).toEqual(whereExpected);
    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
});

describe('Throw on both "amount_min" and "amount_max" from Request to findAndCount() arguments', () => {
  test('Throw on both "amount_min" and "amount_max" strings to "where" from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { amountMin: '44.5', amountMax: '8e1' } } };
    try {
      conductOptions(req);
      expect(() => {}).toThrow(); // should throw on previous line
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });
});
