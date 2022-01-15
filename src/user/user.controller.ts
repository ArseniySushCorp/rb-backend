import { USER_NOT_FOUND } from "./user.const"
import { AdminGuard } from "src/user/guards/admin.guard"
import { UserType } from "./types/user.type"
import { User } from "./decorators/user.decorator"
import { UserService } from "./user.service"
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from "@nestjs/common"

import { LocalAuthGuard } from "../auth/guards/local.auth.guard"
import { Public } from "../auth/guards/jwt.auth.guard"
import { SignInDTO } from "./dto/signIn.dto"
import { LoginResponse } from "../auth/types/LoginResponse.type"

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Public()
  @Post("user")
  async signIn(@Body() dto: SignInDTO): Promise<LoginResponse> {
    const user = await this.service.createUser(dto)

    return this.service.buildLoginResponse(user)
  }

  @Public()
  @Post("user/login")
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserType): Promise<LoginResponse> {
    return this.service.buildLoginResponse(user)
  }

  @Delete("user/:id")
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param("id") userId: number): Promise<void> {
    const user = this.service.findUser(userId)

    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND)
    }

    await this.service.deleteUser(user)
  }
}
