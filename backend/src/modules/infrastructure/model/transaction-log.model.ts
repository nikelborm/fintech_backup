import { Currency } from 'src/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '.';

@Entity()
export class TransactionLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.receivedTransactions, {
    nullable: false,
  })
  @JoinColumn({ name: 'recipientId' })
  recipient?: User;

  @Column({ nullable: false })
  recipientId?: number;

  @ManyToOne(() => User, (user) => user.sentTransactions, { nullable: true })
  @JoinColumn({ name: 'senderId' })
  sender?: User;

  @Column({ nullable: true })
  senderId: number;

  @Column({ nullable: false })
  moneyAmount!: number;

  @Column({ nullable: false })
  comment!: string;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
    nullable: false,
  })
  currency!: Currency;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  createdAt!: Date;
}
