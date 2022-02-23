// // import { conductGetUserExpenses, getFindArgs } from '../../conductors';

import { BadRequest } from '@nc/utils';
import { conductOptions } from '../../conducts';

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
