import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserType } from "./../types/user.type"
import { ExpressRequestInterface } from "../../shared/types/expressRequest.interface"

export const User = createParamDecorator((data: keyof UserType, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest<ExpressRequestInterface>()

  if (!user) {
    return null
  }

  if (data) {
    return user[data]
  }

  return user
})
