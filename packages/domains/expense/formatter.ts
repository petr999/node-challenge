import { Expense } from './entity';
import { ExpenseFormatted } from './types';

const publicFields = [
  'id', 'dateCreated', 'userId', 'merchantName', 'amountInCents', 'currency', 'amount',
];

export function secureTrim(expenses: ExpenseFormatted[], count: number): string {
  const expensesPublic = expenses.map((expense) => {
    const expenseNew = {};
    publicFields.forEach((expenseKey) => {
      expenseNew[expenseKey] = expense[expenseKey];
    });
    return expenseNew;
  });
  return JSON.stringify([expensesPublic, count]);
}

export function format(rawExpenses: Expense[]): ExpenseFormatted[] {
  return rawExpenses?.map((rawExpense) => {
    const { amountInCents, ...expense } = rawExpense;
    const amount = (amountInCents / 100).toFixed(2);
    return {
      amount, ...expense,
    };
  });
}
