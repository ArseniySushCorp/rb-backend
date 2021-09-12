import { MigrationInterface, QueryRunner } from "typeorm"

export class UniqueEmailForUsers1631469934501 implements MigrationInterface {
  name = "UniqueEmailForUsers1631469934501"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
    )
  }
}
