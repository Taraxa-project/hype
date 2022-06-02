import { MigrationInterface, QueryRunner } from "typeorm";

export class HypePool1654166526914 implements MigrationInterface {
    name = 'HypePool1654166526914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hype_pool" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "accountAddress" character varying NOT NULL, "minReward" integer NOT NULL, "poolCap" integer NOT NULL, "poolEnds" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9465df652d752ada2f7485eea2b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hype_pool"`);
    }

}
