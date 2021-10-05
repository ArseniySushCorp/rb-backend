import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import ormconfig from "./configs/ormconfig"

const businessModules = [UserModule, AuthModule]

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
