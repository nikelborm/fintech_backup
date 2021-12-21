import { MigrationInterface, QueryRunner } from 'typeorm';

export class MatchRequest1639203740184 implements MigrationInterface {
  name = 'MatchRequest1639203740184';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "match_request" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "willExpireAt" TIMESTAMP WITH TIME ZONE NOT NULL, "wasUsedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdByUserId" integer NOT NULL, "wasUsedToInviteUserId" integer, "establishmentId" integer NOT NULL, CONSTRAINT "PK_303300dcdcab1123d821848ec41" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_request" ADD CONSTRAINT "FK_d1c746a09d361c62100ee9aeef1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_request" ADD CONSTRAINT "FK_5f0d06b33801a76b356d997f439" FOREIGN KEY ("wasUsedToInviteUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_request" ADD CONSTRAINT "FK_1ee0ab49068490d3cc95484ce4f" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match_request" DROP CONSTRAINT "FK_1ee0ab49068490d3cc95484ce4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_request" DROP CONSTRAINT "FK_5f0d06b33801a76b356d997f439"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_request" DROP CONSTRAINT "FK_d1c746a09d361c62100ee9aeef1"`,
    );
    await queryRunner.query(`DROP TABLE "match_request"`);
  }
}
