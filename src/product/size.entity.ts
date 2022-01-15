import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProductEntity } from "./product.entity"

@Entity({ name: "sizes" })
export class SizeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  size: string

  @Column({ default: 0, nullable: false })
  price: number

  @ManyToOne(() => ProductEntity, (product) => product.sizes, {
    nullable: false,
    orphanedRowAction: "delete"
  })
  product: ProductEntity
}
