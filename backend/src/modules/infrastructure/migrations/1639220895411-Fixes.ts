import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fixes1639220895411 implements MigrationInterface {
  name = 'Fixes1639220895411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "comment" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "middleName" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "middleName" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "comment" DROP NOT NULL`,
    );
  }
}
