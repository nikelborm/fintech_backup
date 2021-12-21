import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndEstablishment1639183156066 implements MigrationInterface {
  name = 'UserAndEstablishment1639183156066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_preferredcurrency_enum" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_preferredlanguage_enum" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying NOT NULL, "preferredCurrency" "public"."user_preferredcurrency_enum" NOT NULL DEFAULT 'usd', "preferredLanguage" "public"."user_preferredlanguage_enum" NOT NULL DEFAULT 'usd', "email" character varying NOT NULL, "salt" character varying NOT NULL, "passwordHash" character varying NOT NULL, "billingInfo" json NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "establishment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "adress" character varying NOT NULL, "ITN" bigint NOT NULL, CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "owner_to_establishment" ("userId" integer NOT NULL, "establishmentId" integer NOT NULL, CONSTRAINT "PK_66d8e32569ec9bd49c8c2d6865c" PRIMARY KEY ("userId", "establishmentId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_042545a2dfbcc5035f4138374d" ON "owner_to_establishment" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4a5f4be56f3ea7abb5307fb4f1" ON "owner_to_establishment" ("establishmentId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "employer_to_establishment" ("userId" integer NOT NULL, "establishmentId" integer NOT NULL, CONSTRAINT "PK_f3d79ee337399c77859d1886dda" PRIMARY KEY ("userId", "establishmentId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d669e1f1d043b4687c72071e41" ON "employer_to_establishment" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b9cac3fe879ab3f1af2211b4cc" ON "employer_to_establishment" ("establishmentId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "owner_to_establishment" ADD CONSTRAINT "FK_042545a2dfbcc5035f4138374d5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "owner_to_establishment" ADD CONSTRAINT "FK_4a5f4be56f3ea7abb5307fb4f1c" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employer_to_establishment" ADD CONSTRAINT "FK_d669e1f1d043b4687c72071e41a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employer_to_establishment" ADD CONSTRAINT "FK_b9cac3fe879ab3f1af2211b4ccb" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employer_to_establishment" DROP CONSTRAINT "FK_b9cac3fe879ab3f1af2211b4ccb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employer_to_establishment" DROP CONSTRAINT "FK_d669e1f1d043b4687c72071e41a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "owner_to_establishment" DROP CONSTRAINT "FK_4a5f4be56f3ea7abb5307fb4f1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "owner_to_establishment" DROP CONSTRAINT "FK_042545a2dfbcc5035f4138374d5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b9cac3fe879ab3f1af2211b4cc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d669e1f1d043b4687c72071e41"`,
    );
    await queryRunner.query(`DROP TABLE "employer_to_establishment"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4a5f4be56f3ea7abb5307fb4f1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_042545a2dfbcc5035f4138374d"`,
    );
    await queryRunner.query(`DROP TABLE "owner_to_establishment"`);
    await queryRunner.query(`DROP TABLE "establishment"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_preferredlanguage_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_preferredcurrency_enum"`);
  }
}
