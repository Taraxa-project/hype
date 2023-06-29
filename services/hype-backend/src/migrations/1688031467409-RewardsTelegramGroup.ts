import { MigrationInterface, QueryRunner } from 'typeorm';

export class RewardsTelegramGroup1688031467409 implements MigrationInterface {
  name = 'RewardsTelegramGroup1688031467409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "telegram_group" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "telegram_group"`,
    );
  }
}
