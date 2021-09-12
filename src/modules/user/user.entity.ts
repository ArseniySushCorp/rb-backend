import { BaseEntity } from "@src/entity/BaseEntity"
import { BeforeInsert, Column, Entity, Unique } from "typeorm"
import { hash, genSalt } from "bcrypt"
import { Exclude } from "class-transformer"

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({ unique: true, length: 150 })
  email: string

  @Column({ length: 150 })
  username: string

  @Exclude()
  @Column()
  password: string

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
  }

  constructor(partial: Partial<UserEntity>) {
    super()
    Object.assign(this, partial)
  }
}
