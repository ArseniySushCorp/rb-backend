import { APP_PIPE } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"

export const ValidationGlobalPipe = {
  provide: APP_PIPE,
  useClass: ValidationPipe
}
