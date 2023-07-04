import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueReward1688469554091 implements MigrationInterface {
  name = 'UniqueReward1688469554091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD CONSTRAINT "UQ_56c2ba7064115516c1b26994a75" UNIQUE ("date_from", "date_to", "impressions", "telegram_id", "telegram_group", "pool_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP CONSTRAINT "UQ_56c2ba7064115516c1b26994a75"`,
    );
  }
}
