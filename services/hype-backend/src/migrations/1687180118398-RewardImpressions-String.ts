import { MigrationInterface, QueryRunner } from 'typeorm';

export class RewardImpressionsString1687180118398
  implements MigrationInterface
{
  name = 'RewardImpressionsString1687180118398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "impressions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "impressions" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "impressions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "impressions" integer`,
    );
  }
}
