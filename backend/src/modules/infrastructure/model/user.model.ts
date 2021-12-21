import { Currency, Language } from 'src/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Establishment, TransactionLog, MatchRequest } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
    nullable: false,
  })
  preferredCurrency!: Currency;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.RU,
    nullable: false,
  })
  preferredLanguage!: Language;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false }) // TODO: select: false and update query for it
  password!: string;

  @Column({ nullable: false })
  isOwner: boolean;

  @Column({ nullable: false })
  isEmployer: boolean;

  @Column({ default: true, nullable: false })
  isCustomer: boolean;

  @Column({ nullable: true, type: 'jsonb' }) // TODO: select: false and update query for it
  billingInfo!: {
    cardNumber: number;
    date: string;
    cvc: number;
  };

  @ManyToMany(() => Establishment, (establishment) => establishment.owners)
  @JoinTable({ name: 'owner_to_establishment' })
  ownEstablishments!: Establishment[];

  @ManyToMany(() => Establishment, (establishment) => establishment.employees)
  @JoinTable({ name: 'employer_to_establishment' })
  employedInEstablishments!: Establishment[];

  @OneToMany(() => TransactionLog, (transactionLog) => transactionLog.sender)
  sentTransactions!: TransactionLog[];

  @OneToMany(() => TransactionLog, (transactionLog) => transactionLog.recipient)
  receivedTransactions!: TransactionLog[];

  @OneToMany(
    () => MatchRequest,
    (matchRequest) => matchRequest.wasUsedToInviteUser,
  )
  invitedByMatchRequests!: MatchRequest[];

  @OneToMany(() => MatchRequest, (matchRequest) => matchRequest.createdByUser)
  ownCreatedMatchRequests!: MatchRequest[];
}
