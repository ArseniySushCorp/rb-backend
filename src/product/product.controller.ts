import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query
} from "@nestjs/common"
import { ProductService } from "./product.service"
import { CreateProductDTO } from "./dto/create-product.dto"
import { ProductEntity } from "./product.entity"
import { Public } from "../auth/guards/jwt.auth.guard"
import { ProductsQueryType } from "./types/product-query.type"
import { ProductResponseInterface } from "./types/products-response.interface"
import { CreateSizeDTO } from "./dto/create-size.dto"
import { SizeEntity } from "./size.entity"

@Controller()
export class ProductController {
  constructor(private service: ProductService) {}

  @Post("product")
  async createProduct(@Body() dto: CreateProductDTO): Promise<ProductEntity> {
    return this.service.createProduct(dto)
  }

  @Post("product/:id/size")
  async addProductSize(
    @Param("id") productId: number,
    @Body() dto: CreateSizeDTO
  ): Promise<SizeEntity> {
    const product = await this.service.findProduct(productId)

    if (!product) {
      throw new HttpException({ product: "not found" }, HttpStatus.BAD_REQUEST)
    }

    return this.service.addProductSize(dto, product)
  }

  @Public()
  @Get("products")
  async getProducts(@Query() query: ProductsQueryType): Promise<ProductResponseInterface> {
    return this.service.findProductsByQuery(query)
  }

  @Public()
  @Get("product/:id")
  async getProduct(@Param("id") productId: number): Promise<ProductEntity> {
    const product = this.service.findProduct(productId)

    if (!product) {
      throw new HttpException({ product: "not found" }, HttpStatus.BAD_REQUEST)
    }

    return product
  }
}
