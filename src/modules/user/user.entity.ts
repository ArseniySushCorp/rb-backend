import { BaseEntity } from "@src/entity/BaseEntity"
import { BeforeInsert, Column, Entity } from "typeorm"
import { hash } from "bcrypt"

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  email: string

  @Column()
  username: string

  @Column({ select: false })
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }
}
