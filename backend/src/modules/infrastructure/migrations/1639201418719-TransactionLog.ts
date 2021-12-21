import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionLog1639201418719 implements MigrationInterface {
  name = 'TransactionLog1639201418719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_log_currency_enum" AS ENUM('xcd', 'bbd', 'usd', 'cny', 'cop', 'crc', 'dop', 'gtq', 'hnl', 'hkd', 'jmd', 'nio', 'pyg', 'pen', 'eur', 'twd', 'ttd', 'mxn', 'rub')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_log" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "currency" "public"."transaction_log_currency_enum" NOT NULL DEFAULT 'usd', "comment" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "recipientId" integer NOT NULL, "senderId" integer, CONSTRAINT "PK_c31d1e77795e3bd9d5f6399f988" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ADD CONSTRAINT "FK_2f5bbf0b79c97ca1c522d765b96" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" ADD CONSTRAINT "FK_662af868da478bbd3c4b039b079" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_log" DROP CONSTRAINT "FK_662af868da478bbd3c4b039b079"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_log" DROP CONSTRAINT "FK_2f5bbf0b79c97ca1c522d765b96"`,
    );
    await queryRunner.query(`DROP TABLE "transaction_log"`);
    await queryRunner.query(
      `DROP TYPE "public"."transaction_log_currency_enum"`,
    );
  }
}
