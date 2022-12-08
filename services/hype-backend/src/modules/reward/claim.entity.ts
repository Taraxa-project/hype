import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { IClaim } from 'src/models/IClaim';

export const tableName = 'hype_claim';

@Entity(tableName)
export class HypeClaim extends BaseEntity implements IClaim {
  constructor(claim?: Partial<HypeClaim>) {
    super();
    Object.assign(this, claim);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  poolId: number;

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
}
