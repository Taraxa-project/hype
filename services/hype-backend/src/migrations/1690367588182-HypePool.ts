import { MigrationInterface, QueryRunner } from 'typeorm';

export class HypePool1690367588182 implements MigrationInterface {
  name = 'HypePool1690367588182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hype_pool" ("id" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_9465df652d752ada2f7485eea2b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hype_pool"`);
  }
}
