import { BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm"

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date()
  }
}
