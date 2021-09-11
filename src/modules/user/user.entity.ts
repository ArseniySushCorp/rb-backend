import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
// import { hash } from "bcrypt"

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  username: string

  @Column({ select: false })
  password: string
}
