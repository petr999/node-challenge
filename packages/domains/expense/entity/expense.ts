import { ExpenseWithoutTimestamp } from '.';
import { Column, Entity } from '../../../utils/dal';

@Entity({ name: 'expenses' })
export class Expense extends ExpenseWithoutTimestamp {
    @Column({ type: 'timestamp', name: 'date_created' })
    dateCreated: Date;
}
