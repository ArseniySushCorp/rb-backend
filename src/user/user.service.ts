import { pick } from "ramda"
import { Repository } from "typeorm"
import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { AuthService } from "../auth/auth.service"
import { UserType } from "./types/user.type"
import { UserEntity } from "./user.entity"
import { SignInDTO } from "./dto/signIn.dto"
import { LoginResponse } from "../auth/types/LoginResponse.type"
import { EMAIL_ALREADY_TAKEN } from "./user.const"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

  async buildLoginResponse(user: UserType): Promise<LoginResponse> {
    const token = await this.authService.getToken(user)
    const responseUser = pick(["username", "email", "id"], user)

    return {
      token,
      user: responseUser
    }
  }

  async findUser(userId): Promise<UserEntity> {
    return this.userRepo.findOne(userId)
  }

  async createUser(dto: SignInDTO): Promise<UserEntity> {
    const existUser = await this.userRepo.findOne({ email: dto.email })

    if (existUser) {
      throw new ConflictException(EMAIL_ALREADY_TAKEN)
    }

    const user = new UserEntity(dto)

    return this.userRepo.save(user)
  }

  async deleteUser(userId): Promise<void> {
    await this.userRepo.delete(userId)
  }
}
