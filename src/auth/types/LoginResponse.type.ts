import { UserResponse } from "../../user/types/userResponse.type"

export type LoginResponse = {
  user: UserResponse
  token: string
}
