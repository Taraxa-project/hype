import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedRewardClaimed1688485811000 implements MigrationInterface {
  name = 'RemovedRewardClaimed1688485811000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hype_reward" DROP COLUMN "claimed"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "claimed" boolean NOT NULL DEFAULT false`,
    );
  }
}
