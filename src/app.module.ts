import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserModule } from "./modules/user/user.module"
import { AuthModule } from "./modules/auth/auth.module"
import ormconfig from "./config/ormconfig"

const businessModules = [AuthModule, UserModule]

const libModules = [
  ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRoot(ormconfig)
]

@Module({
  imports: [...businessModules, ...libModules]
})
export class AppModule {}
