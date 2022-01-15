import { ProductCategory } from "./product-category.enum"

export type ProductsQueryType = {
  limit?: number
  category?: ProductCategory
  offset?: number
}
