import { ExpensesFormatted } from './types';
import { format } from './formatter';
import { getUserDetails } from '../user';
import { readUserExpenses } from './data/db-user-expenses';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils';

export async function getUserExpenses(userId, findArgs): Promise<ExpensesFormatted> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const user = await getUserDetails(userId); // may throw on nonexistent userId

  if (!user) {
    throw NotFound('userId \'{userId}\': not found');
  }

  const [dbError, rawExpenses] = await to(readUserExpenses(userId, findArgs));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  const expenses: ExpensesFormatted = [format(rawExpenses[0]), rawExpenses[1]];

  return expenses;
}
