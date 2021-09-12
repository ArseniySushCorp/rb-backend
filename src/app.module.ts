import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import ormconfig from "@src/config/ormconfig"
import { UserModule } from "./modules/user/user.module"
import { AuthModule } from "./modules/auth/auth.module"

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
