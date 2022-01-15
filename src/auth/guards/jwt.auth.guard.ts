import {
  CustomDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { SetMetadata } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { APP_GUARD, Reflector } from "@nestjs/core"
import { Observable } from "rxjs"

export const IS_PUBLIC_KEY = "isPublic"

@Injectable()
class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    return super.canActivate(context)
  }

  handleRequest(err, user, info): any {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}

export const JwtAuthGlobalGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard
}

export const Public = (): CustomDecorator<string> => SetMetadata(IS_PUBLIC_KEY, true)
