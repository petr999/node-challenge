import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
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

    @Column({ type: 'timestamp', name: 'date_created' })
    dateCreated: Date;

    @Column()
    status: string;
}
