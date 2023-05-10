import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTelegramIdUpdate1683716076672 implements MigrationInterface {
  name = 'UserTelegramIdUpdate1683716076672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD "telegramId" character varying`,
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
    await queryRunner.query(
      `ALTER TABLE "hype_user" DROP CONSTRAINT "UQ_8c46d3bc50148119df073daa9aa"`,
    );
    await queryRunner.query(`ALTER TABLE "hype_user" DROP COLUMN "telegramId"`);
    await queryRunner.query(
      `ALTER TABLE "hype_user" ADD "telegramId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_user" ADD CONSTRAINT "UQ_cab8163e3a343480b455cfacf21" UNIQUE ("telegramId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_user" DROP CONSTRAINT "UQ_cab8163e3a343480b455cfacf21"`,
    );
    await queryRunner.query(`ALTER TABLE "hype_user" DROP COLUMN "telegramId"`);
    await queryRunner.query(`ALTER TABLE "hype_user" ADD "telegramId" integer`);
    await queryRunner.query(
      `ALTER TABLE "hype_user" ADD CONSTRAINT "UQ_8c46d3bc50148119df073daa9aa" UNIQUE ("telegramId")`,
    );
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
