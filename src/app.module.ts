import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import ormconfig from "@src/config/ormconfig"
import { UserModule } from "./modules/user/user.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    TypeOrmModule.forRoot(ormconfig)
  ]
})
export class AppModule {
  constructor() {
    console.log("ENV IN NEST", process.env.PORT)
  }
}
