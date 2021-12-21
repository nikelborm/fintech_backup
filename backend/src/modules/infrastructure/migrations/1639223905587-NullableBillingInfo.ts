import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableBillingInfo1639223905587 implements MigrationInterface {
  name = 'NullableBillingInfo1639223905587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "billingInfo"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "billingInfo" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "billingInfo"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "billingInfo" json NOT NULL`,
    );
  }
}
