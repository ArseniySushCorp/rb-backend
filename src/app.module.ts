import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import ormconfig from "@src/config/ormconfig"
import { UserModule } from "./modules/user/user.module"
import { AuthModule } from "./modules/auth/auth.module"

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(ormconfig)
  ]
})
export class AppModule {}
