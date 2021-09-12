import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}
