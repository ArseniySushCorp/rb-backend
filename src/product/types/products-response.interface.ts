import { ProductEntity } from "./../product.entity"

export interface ProductResponseInterface {
  products: ProductEntity[]
  productsCount: number
  colors: string[]
  brands: string[]
  sizes: string[]
}
