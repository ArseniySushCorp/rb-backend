import { UserType } from "./types/user.type"
import { User } from "./decorators/user.decorator"
import { UserService } from "./user.service"
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common"

import { LocalAuthGuard } from "../auth/guards/local.auth.guard"
import { Public } from "../auth/guards/jwt.auth.guard"
import { SignInDTO } from "./dto/signIn.dto"
import { LoginResponse } from "../auth/types/LoginResponse.type"
import { UserEntity } from "./user.entity"

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Public()
  @Post("user")
  @UseInterceptors(ClassSerializerInterceptor)
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

  // TODO: test request
  @Get("users")
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(): Promise<UserEntity[]> {
    return this.service.getUsers()
  }
}
