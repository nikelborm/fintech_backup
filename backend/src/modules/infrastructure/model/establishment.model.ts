import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { MatchRequest, User } from '.';

@Entity()
export class Establishment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false, type: 'bigint' })
  ITN!: number;

  @ManyToMany(() => User, (user) => user.ownEstablishments)
  owners!: User[];

  @ManyToMany(() => User, (user) => user.employedInEstablishments)
  employees!: User[];

  @OneToMany(() => MatchRequest, (matchRequest) => matchRequest.establishment)
  matchRequests!: MatchRequest[];
}
