import { UserType } from "../user/types/user.type"
import { compare } from "bcrypt"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"
import { UserEntity } from "../user/user.entity"
import { EMAIL_NOT_FOUND, WRONG_PASSWORD } from "./auth.const"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserType> {
    const user = await this.userRepo.findOne({ email })

    if (!user) {
      throw new UnauthorizedException(EMAIL_NOT_FOUND)
    }

    const isMatchPasswords = await compare(password, user.password)

    if (!isMatchPasswords) {
      throw new UnauthorizedException(WRONG_PASSWORD)
    }

    delete user.password

    return user
  }

  async getToken(user: UserType): Promise<string> {
    const payload = { email: user.email, sub: user.id }

    return this.jwtService.sign(payload)
  }
}
