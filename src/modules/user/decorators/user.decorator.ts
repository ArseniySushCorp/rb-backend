import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { ExpressRequestInterface } from "@src/types/expressRequest.interface"

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest<ExpressRequestInterface>()

  if (!user) {
    return null
  }

  if (data) {
    return user[data]
  }

  return user
})
