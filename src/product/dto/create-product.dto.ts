import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { ProductCategory } from "../types/product-category.enum"

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsArray()
  readonly brands: string[]

  @IsNotEmpty()
  @IsArray()
  readonly colors: string[]

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  readonly category: ProductCategory

  @IsString()
  readonly description: string
}
