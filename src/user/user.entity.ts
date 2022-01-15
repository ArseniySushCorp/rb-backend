import { BeforeInsert, Column, Entity } from "typeorm"
import { Exclude } from "class-transformer"
import { hash, genSalt } from "bcrypt"

import { BaseEntity } from "../shared/entity/BaseEntity"
import { UserRole } from "./types/user-role.enum"

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({ unique: true, length: 150 })
  email: string

  @Column({ length: 150 })
  username: string

  @Exclude()
  @Column()
  password: string

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole

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
