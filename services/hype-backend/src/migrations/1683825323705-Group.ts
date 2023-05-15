import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema1683825323705 implements MigrationInterface {
  name = 'Schema1683825323705';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table "group" (
        id             serial
            constraint "PK_256aa0fda9b1de1a73ee0b7106b"
                primary key,
        group_id       integer,
        group_username varchar not null,
        group_title    varchar,
        created_at     timestamp with time zone default now()
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "group"`);
  }
}
