import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PassportModule } from "@nestjs/passport"

import { AuthService } from "./auth.service"
import { UserEntity } from "../user/user.entity"

import { JwtModule } from "@nestjs/jwt"
import { LocalStrategy } from "./strategy/local.strategy"
import { JwtStrategy } from "./strategy/jwt.strategy"
import { JwtAuthGlobalGuard } from "./guard/jwt.auth.guard"

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGlobalGuard],
  exports: [AuthService]
})
export class AuthModule {}
