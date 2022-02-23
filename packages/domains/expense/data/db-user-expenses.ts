import { Expense } from '../entity';
import { ExpenseFindArgs } from '../types';
import { getRepository } from '@nc/utils';

export const readUserExpenses = (userId: string, findArgs: ExpenseFindArgs) => {
  const expenseRepository = getRepository(Expense);

  if (findArgs.where) findArgs.where.userId = userId;
  else findArgs.where = { userId };

  return expenseRepository.findAndCount(findArgs);
};
