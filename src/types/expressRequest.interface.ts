import { UserType } from "@src/modules/user/types/user.type"
import { Request } from "express"

export interface ExpressRequestInterface extends Request {
  user?: UserType
}
