import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RewardColumnNameUpdate1687273276705 implements MigrationInterface {
  name = 'RewardColumnNameUpdate1687273276705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'hype_reward',
      'poolId',
      new TableColumn({
        name: 'pool_id',
        type: 'character varying',
        isNullable: false,
      }),
    );
    await queryRunner.renameColumn(
      'hype_reward',
      'telegramId',
      new TableColumn({
        name: 'telegram_id',
        type: 'character varying',
        isNullable: true,
      }),
    );
    await queryRunner.renameColumn(
      'hype_reward',
      'telegramUsername',
      new TableColumn({
        name: 'telegram_username',
        type: 'character varying',
        isNullable: true,
      }),
    );
    await queryRunner.renameColumn(
      'hype_reward',
      'tokenAddress',
      new TableColumn({
        name: 'token_address',
        type: 'character varying',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'hype_reward',
      'token_address',
      new TableColumn({
        name: 'tokenAddress',
        type: 'character varying',
        isNullable: false,
      }),
    );
    await queryRunner.renameColumn(
      'hype_reward',
      'telegram_username',
      new TableColumn({
        name: 'telegramUsername',
        type: 'character varying',
      }),
    );
    await queryRunner.renameColumn(
      'hype_reward',
      'telegram_id',
      new TableColumn({
        name: 'telegramId',
        type: 'character varying',
      }),
    );
    await queryRunner.renameColumn(
      'hype_reward',
      'pool_id',
      new TableColumn({
        name: 'poolId',
        type: 'character varying',
        isNullable: false,
      }),
    );
  }
}
