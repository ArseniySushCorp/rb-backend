import { InjectRepository } from "@nestjs/typeorm"
import { Injectable } from "@nestjs/common"
import { map, prop } from "ramda"
import { getRepository, Repository } from "typeorm"

import { SizeEntity } from "./size.entity"
import { CreateSizeDTO } from "./dto/create-size.dto"
import { ProductEntity } from "./product.entity"
import { CreateProductDTO } from "./dto/create-product.dto"
import { ProductsQueryType } from "./types/product-query.type"
import { ProductResponseInterface } from "./types/products-response.interface"
import { PRODUCTS_LIMIT } from "./product.const"
import { extract } from "./product.helpers"

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(SizeEntity) private readonly sizeRepo: Repository<SizeEntity>
  ) {}

  async createProduct(dto: CreateProductDTO): Promise<ProductEntity> {
    const product = new ProductEntity(dto)

    return this.productRepo.save(product)
  }

  async findProduct(productId: number): Promise<ProductEntity> {
    return this.productRepo.findOne(productId, { relations: ["sizes"] })
  }

  async addProductSize(dto: CreateSizeDTO, product: ProductEntity): Promise<SizeEntity> {
    const newSize = new SizeEntity()
    Object.assign(newSize, { ...dto, product: product.id })

    product.sizes.push(newSize)

    await this.productRepo.save(product)
    await this.sizeRepo.save(newSize)

    return await this.sizeRepo.save(newSize)
  }

  async findProductsByQuery(query: ProductsQueryType): Promise<ProductResponseInterface> {
    const queryBuilder = getRepository(ProductEntity)
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.sizes", "sizes")
      .orderBy("products.createdAt", "ASC")
      .take(query.limit || PRODUCTS_LIMIT)

    if (query.offset) {
      queryBuilder.offset(query.offset)
    }

    if (query.category) {
      queryBuilder.where("products.category = :category", { category: query.category })
    }

    const productsCount = await queryBuilder.getCount()
    const products = await queryBuilder.getMany()

    const colorsAndBrands = await getRepository(ProductEntity)
      .createQueryBuilder("products")
      .distinct(true)
      .select(["colors", "brands"])
      .getRawMany()

    const sizes = await getRepository(SizeEntity)
      .createQueryBuilder("sizes")
      .distinct(true)
      .select("size")
      .getRawMany()
      .then(map<{ size: string }, string>(prop("size")))

    return {
      products,
      productsCount,
      colors: extract(colorsAndBrands, "colors"),
      brands: extract(colorsAndBrands, "brands"),
      sizes
    }
  }

  async deleteProduct(product: ProductEntity): Promise<void> {
    await this.sizeRepo.delete({ product })
    await this.productRepo.delete(product.id)
  }

  async deleteProductSize(sizeId: number): Promise<void> {
    await this.sizeRepo.delete(sizeId)
  }
}
