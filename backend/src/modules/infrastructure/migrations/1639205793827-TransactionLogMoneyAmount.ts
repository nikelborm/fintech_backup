import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionLogMoneyAmount1639205793827
  implements MigrationInterface
{
  name = 'TransactionLogMoneyAmount1639205793827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_log" RENAME COLUMN "quantity" TO "moneyAmount"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_log" RENAME COLUMN "moneyAmount" TO "quantity"`,
    );
  }
}
