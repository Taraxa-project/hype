import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueReward1688412946549 implements MigrationInterface {
  name = 'UniqueReward1688412946549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD CONSTRAINT "UQ_ad03e34e9b4ba01ce55d344f03a" UNIQUE ("date_from", "date_to", "impressions", "telegram_id", "telegram_group", "telegram_username", "pool_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP CONSTRAINT "UQ_ad03e34e9b4ba01ce55d344f03a"`,
    );
  }
}
