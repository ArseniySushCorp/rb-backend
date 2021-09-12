import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
