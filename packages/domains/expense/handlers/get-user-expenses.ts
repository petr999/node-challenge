import { dbConnect } from '../../../utils/db';
import { Expense } from '../entity/expense';
import { ExpenseFindArgs } from '../types.d';

export const getUserExpenses = async (userId: string, findArgs: ExpenseFindArgs) => {
  const connection = await dbConnect();
  const expenseRepository = connection.getRepository(Expense);

  if (findArgs.where) findArgs.where.userId = userId;
  else findArgs.where = { userId };

  return expenseRepository.findAndCount(findArgs);
};
