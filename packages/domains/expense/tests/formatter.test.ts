import { Expense } from '../entity';
import { ExpensesFormatted } from '../types';
import { format, secureTrim } from '../formatter';

const sampleUserExpenses: Expense[] = [{
  id: '98925892-8d0c-4cd3-bdbd-e2249e15900f',
  dateCreated: new Date('2022-02-22T01:01:01Z'),
  status: 'processed',
  userId: '98925892-8d0c-4cd3-bdbd-e2249e15900e',
  merchantName: 'Fred\'s',
  amountInCents: 5500,
  currency: 'DKK',
},
{
  id: '98925892-8d0c-4cd3-bdbd-e2249e15900d',
  dateCreated: new Date('2022-02-22T01:01:01Z'),
  status: 'processed',
  userId: '98925892-8d0c-4cd3-bdbd-e2249e15900e',
  merchantName: 'Fred\'s',
  amountInCents: 5501,
  currency: 'DKK',
},
];

const sampleUserExpensesFormatted: ExpensesFormatted = [[
  {
    id: '98925892-8d0c-4cd3-bdbd-e2249e15900f',
    dateCreated: new Date('2022-02-22T01:01:01Z'),
    status: 'processed',
    userId: '98925892-8d0c-4cd3-bdbd-e2249e15900e',
    merchantName: 'Fred\'s',
    amount: '55.00',
    currency: 'DKK',
  },
  {
    id: '98925892-8d0c-4cd3-bdbd-e2249e15900d',
    dateCreated: new Date('2022-02-22T01:01:01Z'),
    status: 'processed',
    userId: '98925892-8d0c-4cd3-bdbd-e2249e15900e',
    merchantName: 'Fred\'s',
    amount: '55.01',
    currency: 'DKK',
  },
], 2];

describe('Expenses secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(secureTrim(...sampleUserExpensesFormatted)).toMatchSnapshot('expenses-securetrim');
  });
});

describe('Expenses format', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(format(sampleUserExpenses)).toEqual(sampleUserExpensesFormatted[0]);
  });
});
