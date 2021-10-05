import { AuthModule } from "../auth/auth.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserEntity } from "./user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
