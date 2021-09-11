import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import ormconfig from "./config/ormconfig"

console.log(ormconfig)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot(ormconfig(process.env))
  ]
})
export class AppModule {}
