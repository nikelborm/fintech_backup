import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { Establishment, User } from '.';

@Entity()
export class MatchRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ nullable: false, unique: true })
  code!: string;

  @ManyToOne(() => User, (user) => user.ownCreatedMatchRequests, {
    nullable: false,
  })
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser!: User;

  @Column({
    nullable: false,
  })
  createdByUserId!: number;

  @ManyToOne(() => User, (user) => user.invitedByMatchRequests, {
    nullable: true,
  })
  @JoinColumn({ name: 'wasUsedToInviteUserId' })
  wasUsedToInviteUser?: User;

  @Column({
    nullable: true,
  })
  wasUsedToInviteUserId?: number;

  @ManyToOne(
    () => Establishment,
    (establishment) => establishment.matchRequests,
    { nullable: false },
  )
  @JoinColumn({ name: 'establishmentId' })
  establishment!: Establishment;

  @Column({
    nullable: false,
  })
  establishmentId!: number;

  @Column({ type: 'timestamptz', nullable: false })
  willExpireAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  wasUsedAt!: Date;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  createdAt!: Date;
}
