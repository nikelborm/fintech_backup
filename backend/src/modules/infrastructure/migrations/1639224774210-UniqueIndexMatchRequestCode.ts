import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueIndexMatchRequestCode1639224774210
  implements MigrationInterface
{
  name = 'UniqueIndexMatchRequestCode1639224774210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match_request" ADD CONSTRAINT "UQ_00d50b1d4d2fdd7a3f862efb212" UNIQUE ("code")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_00d50b1d4d2fdd7a3f862efb21" ON "match_request" ("code") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_00d50b1d4d2fdd7a3f862efb21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_request" DROP CONSTRAINT "UQ_00d50b1d4d2fdd7a3f862efb212"`,
    );
  }
}
