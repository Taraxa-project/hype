import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { IClaim } from '../models/IClaim';

@Entity('hype_claim')
export class HypeClaim extends BaseEntity implements IClaim {
  constructor(claim?: Partial<HypeClaim>) {
    super();
    Object.assign(this, claim);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  poolId: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  amount: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  rewardee: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  tokenAddress: string;

  @Column({ nullable: false, default: false })
  @IsNotEmpty()
  @IsBoolean()
  claimed: boolean;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  hash: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  nonce: number;
}
