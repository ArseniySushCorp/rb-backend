import { pick } from "ramda"
import { UserType } from "./types/user.type"
import { AuthService } from "./../auth/auth.service"
import { ConflictException, Injectable } from "@nestjs/common"

import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UserEntity } from "./user.entity"
import { SignInDTO } from "./dto/signIn.dto"
import { LoginResponse } from "../auth/types/LoginResponse.type"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
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

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepo.find()
  }

  async createUser(dto: SignInDTO): Promise<UserEntity> {
    const existUser = await this.userRepo.findOne({ email: dto.email })

    if (existUser) {
      throw new ConflictException("email has already been taken")
    }

    const user = new UserEntity(dto)

    return await this.userRepo.save(user)
  }
}
