import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RewardImpressionsString1687180118398
  implements MigrationInterface
{
  name = 'RewardImpressionsString1687180118398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('hype_reward');
    const currentColumn = table.columns.find(
      (column) => column.name === 'impressions',
    );
    await queryRunner.changeColumn(
      'hype_reward',
      currentColumn,
      new TableColumn({
        name: 'impressions',
        type: 'character varying',
        isNullable: currentColumn.isNullable, // keep the same nullability
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('hype_reward');
    const currentColumn = table.columns.find(
      (column) => column.name === 'impressions',
    );
    await queryRunner.changeColumn(
      'hype_reward',
      currentColumn,
      new TableColumn({
        name: 'impressions',
        type: 'integer',
        isNullable: currentColumn.isNullable, // keep the same nullability
      }),
    );
  }
}
