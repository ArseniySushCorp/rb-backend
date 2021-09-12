import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { ContextIdFactory, ModuleRef } from "@nestjs/core"
import { UserEntity } from "@src/modules/user/user.entity"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "../auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({ usernameField: "email", passReqToCallback: true })
  }

  async validate(
    request: Request,
    email: string,
    password: string
  ): Promise<Omit<UserEntity, "password">> {
    const contextId = ContextIdFactory.getByRequest(request)

    const authService = await this.moduleRef.resolve(AuthService, contextId)

    const user = await authService.validateUser(email, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
