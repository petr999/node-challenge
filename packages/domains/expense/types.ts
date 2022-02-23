import { Expense } from './entity';
import { FindConditions, FindManyOptions } from 'typeorm';

export type ExpenseFindArgs =
    Omit<FindManyOptions<Expense>, 'where'> & {where?: FindConditions<Expense>}

export type ExpenseFormatted = Omit<Expense, 'amountInCents'> & {
    amount: string
}

export type ExpensesFormatted = [ExpenseFormatted[], number]
