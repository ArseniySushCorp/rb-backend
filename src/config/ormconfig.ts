import { TypeOrmModuleOptions } from "@nestjs/typeorm"

const config = ({
  POSTGRES_HOST,
  POSTGRESS_PORT,
  POSTGRES_USER,
  POSTGRESS_PASSWORD,
  POSTGRES_DB
}): TypeOrmModuleOptions => ({
  type: "postgres",
  host: POSTGRES_HOST,
  port: +POSTGRESS_PORT,
  username: POSTGRES_USER,
  password: POSTGRESS_PASSWORD,
  database: POSTGRES_DB,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: [__dirname + "db/migrate/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/db/migrate"
  }
})

export default config
