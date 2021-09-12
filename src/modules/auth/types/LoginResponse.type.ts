import { UserType } from "./../../user/types/user.type"

export type LoginResponse = {
  user: UserType
  token: string
}
