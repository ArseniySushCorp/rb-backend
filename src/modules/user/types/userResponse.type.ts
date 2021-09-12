import { UserEntity } from "../user.entity"

export type UserResponse = Pick<UserEntity, "username" | "email" | "id">
