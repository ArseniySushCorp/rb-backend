import { UserService } from "./user.service"
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request
} from "@nestjs/common"

import { LocalAuthGuard } from "../auth/guard/local.auth.guard"
import { Public } from "../auth/guard/jwt.auth.guard"
import { SignInDTO } from "./dto/signIn.dto"

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Public()
  @Post("user/login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.service.login(req.user)
  }

  @Public()
  @Post("user")
  @UseInterceptors(ClassSerializerInterceptor)
  async signIn(@Body() dto: SignInDTO) {
    return this.service.createUser(dto)
  }

  @Get("users")
  @UseInterceptors(ClassSerializerInterceptor)
  getUser() {
    return this.service.getUser()
  }
}
