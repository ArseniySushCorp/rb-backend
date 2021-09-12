import { AuthService } from "./../auth/auth.service"
import { ConflictException, Injectable } from "@nestjs/common"

import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UserEntity } from "./user.entity"
import { SignInDTO } from "./dto/signIn.dto"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

  async login(user: any) {
    return await this.authService.login(user)
  }

  async getUser() {
    return await this.userRepo.find()
  }

  async createUser(dto: SignInDTO) {
    const existUser = await this.userRepo.findOne({ email: dto.email })

    if (existUser) {
      throw new ConflictException("email has already been taken")
    }

    const user = new UserEntity(dto)

    return await this.userRepo.save(user)
  }
}
