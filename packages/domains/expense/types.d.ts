import { Expense } from './entity/expense';
import { FindConditions, FindManyOptions } from 'typeorm';

export type ExpenseFindArgs =
    Omit<FindManyOptions<Expense>, 'where'> & {where?: FindConditions<Expense>}
