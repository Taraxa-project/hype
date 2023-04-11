import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema1678191755364 implements MigrationInterface {
  name = 'Schema1678191755364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hype_claim" ("id" SERIAL NOT NULL, "poolId" character varying NOT NULL, "amount" character varying NOT NULL, "rewardee" character varying NOT NULL, "tokenAddress" character varying NOT NULL, "claimed" boolean NOT NULL DEFAULT false, "hash" character varying NOT NULL, "nonce" integer NOT NULL, CONSTRAINT "PK_9e39bbfe0551b0ca00542cc3194" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hype_reward" ("id" SERIAL NOT NULL, "poolId" character varying NOT NULL, "amount" character varying NOT NULL, "rewardee" character varying NOT NULL, "tokenAddress" character varying NOT NULL, "claimed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6a1502d10e0da9d2cbef3017ebf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hype_user" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "username" character varying, "telegramId" integer, "auth_date" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_019ad5d853540bc0bc1f2c0d5b0" UNIQUE ("address"), CONSTRAINT "UQ_027113c6b425f4477a87757db6f" UNIQUE ("username"), CONSTRAINT "UQ_8c46d3bc50148119df073daa9aa" UNIQUE ("telegramId"), CONSTRAINT "PK_80d3e25d41e251462a7a6daa3bd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hype_user"`);
    await queryRunner.query(`DROP TABLE "hype_reward"`);
    await queryRunner.query(`DROP TABLE "hype_claim"`);
  }
}
