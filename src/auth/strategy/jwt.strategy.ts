import { Repository } from "typeorm"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ConfigService } from "@nestjs/config"

import { UserEntity } from "../../user/user.entity"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get("JWT_SECRET")
    })
  }

  async validate(payload: any): Promise<any> {
    const existUser = this.userRepo.findOne(payload.sub)

    if (!existUser) {
      throw new UnauthorizedException()
    }

    return { ...payload, id: payload.sub }
  }
}
