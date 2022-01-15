import { ExpressRequestInterface } from "../../shared/types/expressRequest.interface"
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common"
import { UserRole } from "../types/user-role.enum"

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<ExpressRequestInterface>()

    if (user.role === UserRole.ADMIN) {
      return true
    }

    throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED)
  }
}
