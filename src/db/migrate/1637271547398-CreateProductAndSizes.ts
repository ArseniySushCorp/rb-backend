import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateProductAndSizes1637271547398 implements MigrationInterface {
  name = "CreateProductAndSizes1637271547398"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sizes" ("id" SERIAL NOT NULL, "size" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "productId" integer NOT NULL, CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE TYPE "products_category_enum" AS ENUM('sneaker', 'streetwear')`)
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "brands" text NOT NULL, "colors" text NOT NULL, "category" "products_category_enum" NOT NULL DEFAULT 'sneaker', "description" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'ADMIN')`)
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`
    )
    await queryRunner.query(
      `ALTER TABLE "sizes" ADD CONSTRAINT "FK_a88acd8214bb21b8da633b8c9ce" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sizes" DROP CONSTRAINT "FK_a88acd8214bb21b8da633b8c9ce"`)
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "role"`)
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`)
    await queryRunner.query(`DROP TABLE "products"`)
    await queryRunner.query(`DROP TYPE "products_category_enum"`)
    await queryRunner.query(`DROP TABLE "sizes"`)
  }
}
