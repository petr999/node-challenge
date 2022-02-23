// // import { conductGetUserExpenses, getFindArgs } from '../../conductors';

import { conductOptions } from "../../conducts";

describe('Throw on invalid Request', () => {
  test('Throw on empty Request', () => {
    const req = {params: {}, query: {},}

    try{
      conductOptions(req)
    } catch(e){
      expect(e.status).toBe(400);
    }
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
