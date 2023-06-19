import { MigrationInterface, QueryRunner } from 'typeorm';

export class RewardDate1686837924459 implements MigrationInterface {
  name = 'RewardDate1686837924459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hype_reward" ADD "date_from" date`);
    await queryRunner.query(`ALTER TABLE "hype_reward" ADD "date_to" date`);
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(`ALTER TABLE "hype_reward" DROP COLUMN "date_to"`);
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "date_from"`,
    );
  }
}
