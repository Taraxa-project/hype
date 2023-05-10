import { MigrationInterface, QueryRunner } from 'typeorm';

export class RewardsTelegramUser1683714914155 implements MigrationInterface {
  name = 'RewardsTelegramUser1683714914155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "telegramId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ALTER COLUMN "rewardee" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "hype_user_id_seq" OWNED BY "hype_user"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_user" ALTER COLUMN "id" SET DEFAULT nextval('"hype_user_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_user" ALTER COLUMN "id" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_user" ALTER COLUMN "id" SET DEFAULT nextval('"hype-user_id_seq"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_user" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "hype_user_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ALTER COLUMN "rewardee" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP COLUMN "telegramId"`,
    );
  }
}
