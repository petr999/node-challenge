import { BadRequest, Between, LessThanOrEqual, Like, MoreThanOrEqual } from '@nc/utils';
import { conductOptions, getFindArgs, getWhere, getWhereAmountPartial, getWhereDatetimePartial, getWhereMerchantName } from '../../conducts';

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

describe('Take "amountMin" and "amountMax" from Request to findAndCount() arguments', () => {
  test('Take "amountMin" string to "where" in cents from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { amountMin: '44.5' } } };
    const [findArgs, conductError, userId] = [{ where: { amountInCents: MoreThanOrEqual(4450) } }, undefined, req.params.userId];
    const [where, whereExpected] = [{}, { amountInCents: MoreThanOrEqual(4450) }];

    expect(() => { getWhereAmountPartial('amountMin', 44.5, where); }).not.toThrowError();
    expect(where).toEqual(whereExpected);
    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
  test('Take "amountMax" string to "where" in cents from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { amountMax: '44.5' } } };
    const [findArgs, conductError, userId] = [{ where: { amountInCents: LessThanOrEqual(4450) } }, undefined, req.params.userId];
    const [where, whereExpected] = [{}, { amountInCents: LessThanOrEqual(4450) }];

    expect(() => { getWhereAmountPartial('amountMax', 44.5, where); }).not.toThrowError();
    expect(where).toEqual(whereExpected);
    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
});

describe('Throw on single "dateCreatedFrom" or "dateCreatedTo" from Request to findAndCount() arguments', () => {
  test('Throw on single "dateCreatedFrom"', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { dateCreatedFrom: '2021-09-18', amountMax: '8e1' } } };
    try {
      conductOptions(req);
      expect(() => {}).toThrow(); // should throw on previous line
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('Throw on single "dateCreatedTo"', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { dateCreatedTo: '2021-09-20' } } };
    try {
      conductOptions(req);
      expect(() => {}).toThrow(); // should throw on previous line
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });
});

describe('Take "dateCreatedFrom" and "dateCreatedTo" from Request to findAndCount() arguments', () => {
  test('Take "dateCreatedFrom" string as "YYYY-MM-DD" and "dateCreatedTo" string as "YYYY-MM-DDZ" to "where" from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { amountMin: '44.5', dateCreatedFrom: '2021-09-18', dateCreatedTo: '2021-09-20Z' } } };
    const [findArgs, conductError, userId] = [{ where: { dateCreated: Between(new Date('2021-09-18Z'), new Date('2021-09-20Z')), amountInCents: MoreThanOrEqual(4450) } }, undefined, req.params.userId];
    const [where, whereExpected] = [{}, { dateCreated: findArgs.where.dateCreated }];

    expect(() => { getWhereDatetimePartial('2021-09-18', '2021-09-20Z', where); }).not.toThrowError();
    expect(where).toEqual(whereExpected);
    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });

  test('Take "dateCreatedFrom" string as "YYYY-MMZ" and "dateCreatedTo" string as "YYYY-MM" to "where" from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { amountMin: '44.5', dateCreatedFrom: '2021-09-18Z', dateCreatedTo: '2021-09' } } };
    const [findArgs, conductError, userId] = [{ where: { dateCreated: Between(new Date('2021-09-18Z'), new Date('2021-09-01Z')), amountInCents: MoreThanOrEqual(4450) } }, undefined, req.params.userId];
    const [where, whereExpected] = [{}, { dateCreated: findArgs.where.dateCreated }];

    expect(() => { getWhereDatetimePartial('2021-09-18Z', '2021-09', where); }).not.toThrowError();
    expect(where).toEqual(whereExpected);
    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });

  test('Take "dateCreatedFrom" string as "YYYY" and "dateCreatedTo" string as "YYYYZ" to "where" from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { amountMin: '44.5', dateCreatedFrom: '2021', dateCreatedTo: '2022Z' } } };
    const [findArgs, conductError, userId] = [{ where: { dateCreated: Between(new Date('2021-01-01Z'), new Date('2022-01-01Z')), amountInCents: MoreThanOrEqual(4450) } }, undefined, req.params.userId];
    const [where, whereExpected] = [{}, { dateCreated: findArgs.where.dateCreated }];

    expect(() => { getWhereDatetimePartial('2021', '2022Z', where); }).not.toThrowError();
    expect(where).toEqual(whereExpected);
    expect(getWhere(req.query.where)).toEqual(findArgs.where);
    expect(getFindArgs(req.query)).toEqual(findArgs);
    expect(conductOptions(req)).toEqual({ findArgs, conductError, userId });
  });
});
