import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity } from "../shared/entity/BaseEntity"
import { SizeEntity } from "./size.entity"
import { ProductCategory } from "./types/product-category.enum"

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {
  @Column()
  name: string

  @Column("simple-array")
  brands: string[]

  @Column("simple-array")
  colors: string[]

  @Column({ type: "enum", enum: ProductCategory, default: ProductCategory.SNEAKER })
  category: ProductCategory

  @Column({ default: "" })
  description: string

  @OneToMany(() => SizeEntity, (size) => size.product, {
    orphanedRowAction: "delete"
  })
  sizes: SizeEntity[]

  constructor(partial: Partial<ProductEntity>) {
    super(partial)
    Object.assign(this, partial)
  }
}
