import { UserService } from "./user.service"
import { Controller, Get } from "@nestjs/common"

@Controller("user")
export class UserController {
  constructor(private service: UserService) {}
  @Get()
  getUser() {
    return this.service.getUser()
  }
}
