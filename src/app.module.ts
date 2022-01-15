import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { ProductModule } from "./product/product.module"
import ormconfig from "./config/ormconfig"
import { JwtAuthGlobalGuard } from "./auth/guards/jwt.auth.guard"
import { ValidationGlobalPipe } from "./shared/pipes/validation-global.pipe"

const businessModules = [AuthModule, UserModule, ProductModule]

const libModules = [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(ormconfig)]

@Module({
  imports: [...businessModules, ...libModules],
  providers: [ValidationGlobalPipe, JwtAuthGlobalGuard]
})
export class AppModule {}
