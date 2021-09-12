import { UserType } from "./../user/types/user.type"
import { LoginResponse } from "./types/LoginResponse.type"
import { UserEntity } from "@src/modules/user/user.entity"
import { compare } from "bcrypt"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserType> {
    const user = await this.userRepo.findOne({ email })

    if (!user) {
      throw new UnauthorizedException("Email not found")
    }

    const isMatchPasswords = await compare(password, user.password)

    if (!isMatchPasswords) {
      throw new UnauthorizedException("Wrong password")
    }

    delete user.password

    return user
  }

  async login(user: UserType): Promise<LoginResponse> {
    const payload = { username: user.username, sub: user.id }

    return {
      token: this.jwtService.sign(payload),
      user: user
    }
  }
}
