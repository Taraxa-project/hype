import { MigrationInterface, QueryRunner } from 'typeorm';

export class HypeUserUniqueUsername1657093328725 implements MigrationInterface {
  name = 'HypeUserUniqueUsername1657093328725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype-user" ADD CONSTRAINT "UQ_027113c6b425f4477a87757db6f" UNIQUE ("username")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype-user" DROP CONSTRAINT "UQ_027113c6b425f4477a87757db6f"`,
    );
  }
}
