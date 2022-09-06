import { MigrationInterface, QueryRunner } from 'typeorm';

export class HypePool1655714961399 implements MigrationInterface {
  name = 'HypePool1655714961399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hype_pool" ("id" SERIAL NOT NULL, "projectName" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "pool" integer NOT NULL, "creatorAddress" character varying NOT NULL, "rewardsAddress" character varying NOT NULL, "minReward" integer NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9465df652d752ada2f7485eea2b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hype_pool"`);
  }
}
