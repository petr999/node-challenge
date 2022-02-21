import { Expense } from '../entity';
import { ExpenseFindArgs } from '../types.d';
import { getRepository } from '@nc/utils/dal';

export const getUserExpenses = (userId: string, findArgs: ExpenseFindArgs) => {
  const expenseRepository = getRepository(Expense);

  if (findArgs.where) findArgs.where.userId = userId;
  else findArgs.where = { userId };

  return expenseRepository.findAndCount(findArgs);
};
