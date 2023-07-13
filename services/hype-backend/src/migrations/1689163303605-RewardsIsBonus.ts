import { MigrationInterface, QueryRunner } from 'typeorm';

export class RewardsIsBonus1689163303605 implements MigrationInterface {
  name = 'RewardsIsBonus1689163303605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "is_bonus" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hype_reward" DROP COLUMN "is_bonus"`);
  }
}
