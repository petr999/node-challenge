import { ExpenseWithoutTimestamp } from '.';
import { Column, Entity } from '@nc/utils/dal';

@Entity()
export class ExpenseTestableBySqlJs extends ExpenseWithoutTimestamp {
    @Column({ name: 'date_created' })
    dateCreated: Date;
}
