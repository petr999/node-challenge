// // import { conductGetUserExpenses, getFindArgs } from '../../conductors';

import { BadRequest, Like } from '@nc/utils';
import { conductOptions, getFindArgs, getWhere, getWhereMerchantName } from '../../conducts';

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

describe('Take only the necessary keys from Request to findAndCount() arguments', () => {
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

  test('Take "merchantName" string to "where" as is from Request', () => {
    const req = { params: { userId: 'f64afaed-6d30-4be5-b7cb-422799a1a406' }, query: { where: { merchantName: 'Donkey Republic' } } };
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

// TBD

// describe('Arguments to find user\'s expenses', () => {
//   describe('Get user\'s ID and arguments for expenses to find()', () => {
//     test('Return user\'s ID in userId field', () => {
//       return expect('mario').toEqual('Mario');
//     });
//   });
// });

// describe('Make user\'s input a valid argument for expenses to find() ', () => {
//   describe('Throw on invalid user\'s input', () => {
//     test('Throw on invalid user ID', () => {
//       return expect(({
//         first_name: 'John',
//         last_name: 'Smith',
//         company_name: 'Pleo',
//         ssn: '1',
//         id: '1',
//       })).toEqual(JSON.stringify({
//         first_name: 'John',
//         last_name: 'Smith',
//         company_name: 'Pleo',
//       }));
//     });
//   });
// });
