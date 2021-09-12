import { MigrationInterface, QueryRunner } from "typeorm"

export class Changes1631475081038 implements MigrationInterface {
  name = "Changes1631475081038"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
    )
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "email" character varying(150) NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
    )
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "username"`)
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "username" character varying(150) NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "username"`)
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "username" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
    )
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "email"`)
    await queryRunner.query(`ALTER TABLE "public"."users" ADD "email" character varying NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
    )
  }
}
