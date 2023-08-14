import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelegramGroupUpdates1692035457211 implements MigrationInterface {
  name = 'TelegramGroupUpdates1692035457211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" ADD "member_count" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD "total_messages" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD "week_start" date NOT NULL DEFAULT '"2023-08-14T17:50:59.673Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "group_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "group_title" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "created_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "created_at" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "created_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "group_title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "group_id" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "week_start"`);
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "total_messages"`);
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "member_count"`);
  }
}
