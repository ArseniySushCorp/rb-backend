import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import dotenv = require("dotenv")

dotenv.config()

const devConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRESS_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRESS_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: [__dirname + "/../db/migrate/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/db/migrate"
  },
  logging: true
}

const testConfig = { ...devConfig, database: process.env.POSTGRES_DB_TEST }

const config = process.env.NODE_ENV === "test" ? testConfig : devConfig

export default config
