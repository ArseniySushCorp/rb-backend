import { Request } from "express"
import { UserType } from "../user/types/user.type"

export interface ExpressRequestInterface extends Request {
  user?: UserType
}
