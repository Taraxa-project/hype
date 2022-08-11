import { MigrationInterface, QueryRunner } from 'typeorm';

export class PoolTokenId1658491167259 implements MigrationInterface {
  name = 'PoolTokenId1658491167259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hype_pool" ADD "tokenId" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hype_pool" DROP COLUMN "tokenId"`);
  }
}
