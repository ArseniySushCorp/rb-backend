import { BaseEntity } from "@src/entity/BaseEntity"
import { BeforeInsert, Column, Entity } from "typeorm"
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
  async hashPassword(): Promise<void> {
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
  }

  constructor(partial: Partial<UserEntity>) {
    super(partial)
    Object.assign(this, partial)
  }
}
