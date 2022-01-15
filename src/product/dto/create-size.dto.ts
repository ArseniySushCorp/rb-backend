import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateSizeDTO {
  @IsNotEmpty()
  @IsString()
  readonly size: string

  @IsNotEmpty()
  @IsNumber()
  readonly price: number
}
