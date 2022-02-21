import { Column, PrimaryGeneratedColumn } from '@nc/utils/dal';

export class ExpenseWithoutTimestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, name: 'merchant_name' })
    merchantName: string;

    @Column({ name: 'amount_in_cents' })
    amountInCents: number;

    @Column({ length: 10 })
    currency: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column()
    status: string;
}
