import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndEstablishmentFixes1639199781006
  implements MigrationInterface
{
  name = 'UserAndEstablishmentFixes1639199781006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordHash"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_preferredlanguage_enum" RENAME TO "user_preferredlanguage_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_preferredlanguage_enum" AS ENUM('ru', 'en')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredLanguage" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredLanguage" TYPE "public"."user_preferredlanguage_enum" USING "preferredLanguage"::"text"::"public"."user_preferredlanguage_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredLanguage" SET DEFAULT 'ru'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_preferredlanguage_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_preferredlanguage_enum_old" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredLanguage" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredLanguage" TYPE "public"."user_preferredlanguage_enum_old" USING "preferredLanguage"::"text"::"public"."user_preferredlanguage_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredLanguage" SET DEFAULT 'usd'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_preferredlanguage_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_preferredlanguage_enum_old" RENAME TO "user_preferredlanguage_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "passwordHash" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "salt" character varying NOT NULL`,
    );
  }
}
