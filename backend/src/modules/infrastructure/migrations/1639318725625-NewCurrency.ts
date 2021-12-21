import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewCurrency1639318725625 implements MigrationInterface {
  name = 'NewCurrency1639318725625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."transaction_log_currency_enum" RENAME TO "transaction_log_currency_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_log_currency_enum" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub', 'czk')`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "currency" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "currency" TYPE "public"."transaction_log_currency_enum" USING "currency"::"text"::"public"."transaction_log_currency_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "currency" SET DEFAULT 'usd'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."transaction_log_currency_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_preferredcurrency_enum" RENAME TO "user_preferredcurrency_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_preferredcurrency_enum" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub', 'czk')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredCurrency" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredCurrency" TYPE "public"."user_preferredcurrency_enum" USING "preferredCurrency"::"text"::"public"."user_preferredcurrency_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredCurrency" SET DEFAULT 'usd'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_preferredcurrency_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_preferredcurrency_enum_old" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredCurrency" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredCurrency" TYPE "public"."user_preferredcurrency_enum_old" USING "preferredCurrency"::"text"::"public"."user_preferredcurrency_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "preferredCurrency" SET DEFAULT 'usd'`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_preferredcurrency_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_preferredcurrency_enum_old" RENAME TO "user_preferredcurrency_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_log_currency_enum_old" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub')`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "currency" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "currency" TYPE "public"."transaction_log_currency_enum_old" USING "currency"::"text"::"public"."transaction_log_currency_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ALTER COLUMN "currency" SET DEFAULT 'usd'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."transaction_log_currency_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."transaction_log_currency_enum_old" RENAME TO "transaction_log_currency_enum"`,
    );
  }
}
