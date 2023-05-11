import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema1683716654047 implements MigrationInterface {
  name = 'Schema1683716654047';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hype_claim" ("id" SERIAL NOT NULL, "poolId" character varying NOT NULL, "amount" character varying NOT NULL, "rewardee" character varying NOT NULL, "tokenAddress" character varying NOT NULL, "claimed" boolean NOT NULL DEFAULT false, "hash" character varying NOT NULL, "nonce" integer NOT NULL, CONSTRAINT "PK_9e39bbfe0551b0ca00542cc3194" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hype_reward" ("id" SERIAL NOT NULL, "poolId" character varying NOT NULL, "amount" character varying NOT NULL, "telegramId" character varying, "rewardee" character varying, "tokenAddress" character varying NOT NULL, "claimed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6a1502d10e0da9d2cbef3017ebf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hype_user" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "username" character varying, "telegramId" character varying, "auth_date" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fd56c1fdaf5a39fee0967b039b5" UNIQUE ("address"), CONSTRAINT "UQ_312160f7040d04c86addaf0c53d" UNIQUE ("username"), CONSTRAINT "UQ_cab8163e3a343480b455cfacf21" UNIQUE ("telegramId"), CONSTRAINT "PK_e07be48f6bbe9196800a4775db8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hype_user"`);
    await queryRunner.query(`DROP TABLE "hype_reward"`);
    await queryRunner.query(`DROP TABLE "hype_claim"`);
  }
}
