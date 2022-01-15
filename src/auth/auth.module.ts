import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

import { AuthService } from "./auth.service"
import { LocalStrategy } from "./strategy/local.strategy"
import { JwtStrategy } from "./strategy/jwt.strategy"
import { jwtConfig } from "../config/jwtconifg"
import { UserEntity } from "../user/user.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig)
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
