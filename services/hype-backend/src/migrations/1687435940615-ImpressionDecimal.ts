import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImpressionDecimal1687435940615 implements MigrationInterface {
  name = 'ImpressionDecimal1687435940615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ALTER COLUMN "impressions" TYPE numeric USING impressions::numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ALTER COLUMN "impressions" TYPE character varying USING impressions::character varying`,
    );
  }
}
