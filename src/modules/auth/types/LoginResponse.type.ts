import { UserEntity } from "@src/modules/user/user.entity"

export type LoginResponse = {
  user: UserEntity
  token: string
}
