import { MigrationInterface, QueryRunner } from 'typeorm';

export class TypoFix1639307759598 implements MigrationInterface {
  name = 'TypoFix1639307759598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "establishment" RENAME COLUMN "adress" TO "address"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "establishment" RENAME COLUMN "address" TO "adress"`,
    );
  }
}
