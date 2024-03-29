import { MigrationInterface, QueryRunner } from 'typeorm';

export class RewardClaimAssociation1687179992085 implements MigrationInterface {
  name = 'RewardClaimAssociation1687179992085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `SELECT setval(
        pg_get_serial_sequence('public.hype_reward', 'id'),
        (
            SELECT MAX("id")
            FROM public.hype_reward
        ) + 1
    );`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "telegramUsername" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "impressions" integer`,
    );
    await queryRunner.query(`ALTER TABLE "hype_reward" ADD "claimId" integer`);
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD CONSTRAINT "FK_03a71d6a57a7be9917fd7ffa2bb" FOREIGN KEY ("claimId") REFERENCES "hype_claim"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP CONSTRAINT "FK_03a71d6a57a7be9917fd7ffa2bb"`,
    );
    await queryRunner.query(`ALTER TABLE "hype_reward" DROP COLUMN "claimId"`);
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "impressions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "telegramUsername"`,
    );
  }
}
