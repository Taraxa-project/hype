import { MigrationInterface, QueryRunner } from 'typeorm';

export class HypeUser1657033470126 implements MigrationInterface {
  name = 'HypeUser1657033470126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hype-user" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "username" character varying, "auth_date" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_019ad5d853540bc0bc1f2c0d5b0" UNIQUE ("address"), CONSTRAINT "PK_80d3e25d41e251462a7a6daa3bd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hype-user"`);
  }
}
