import { ConfigService } from "@nestjs/config"

export const jwtConfig = {
  useFactory: (config: ConfigService): { secret: string } => ({ secret: config.get("JWT_SECRET") }),
  inject: [ConfigService]
}
