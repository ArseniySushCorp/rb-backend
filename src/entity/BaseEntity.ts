import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer"

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @CreateDateColumn()
  createdAt: Date

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<BaseEntity>) {
    Object.assign(this, partial)
  }
}
