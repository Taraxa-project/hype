import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelegramGroupUpdates1691929138307 implements MigrationInterface {
  name = 'TelegramGroupUpdates1691929138307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group" ADD "member_count" integer`);
    await queryRunner.query(`ALTER TABLE "group" ADD "total_messages" integer`);
    await queryRunner.query(`ALTER TABLE "group" ADD "week_start" date`);
    await queryRunner.query(
      `ALTER TABLE "group" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "created_at" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "week_start"`);
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "total_messages"`);
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "member_count"`);
  }
}
