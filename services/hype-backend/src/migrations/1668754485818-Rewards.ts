import { MigrationInterface, QueryRunner } from 'typeorm';

export class src1668754485818 implements MigrationInterface {
  name = 'src1668754485818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hype_reward" ("id" SERIAL NOT NULL, "amount" character varying NOT NULL, "rewardee" character varying NOT NULL, "tokenAddress" character varying NOT NULL, "poolId" integer, CONSTRAINT "PK_6a1502d10e0da9d2cbef3017ebf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "hype_reward" ADD CONSTRAINT "FK_573687ddf0c5c68e39a6c9a38bb" FOREIGN KEY ("poolId") REFERENCES "hype_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hype_reward" DROP CONSTRAINT "FK_573687ddf0c5c68e39a6c9a38bb"`,
    );
    await queryRunner.query(`DROP TABLE "hype_reward"`);
  }
}
