import { MigrationInterface, QueryRunner } from "typeorm"

export class UserExtendsBaseEntity1631427892789 implements MigrationInterface {
  name = "UserExtendsBaseEntity1631427892789"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "createdAt"`)
  }
}
