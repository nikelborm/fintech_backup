import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleFields1639217323975 implements MigrationInterface {
  name = 'RoleFields1639217323975';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isOwner" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isEmployer" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isCustomer" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isCustomer"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmployer"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isOwner"`);
  }
}
