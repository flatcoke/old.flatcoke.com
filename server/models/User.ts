import { hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import {
  BeforeCreate,
  Column,
  DataType,
  DefaultScope,
  IsEmail,
  Model,
  NotEmpty,
  Table,
} from 'sequelize-typescript'
import { JWT_KEY } from '../config/env'

@DefaultScope({
  attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
})
@Table({
  tableName: 'users',
  paranoid: true,
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number

  @IsEmail
  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: {
      name: 'email',
      msg: 'The email already used.',
    },
  })
  email!: string

  @NotEmpty
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: {
      name: 'username',
      msg: 'The username already used.',
    },
  })
  username!: string

  @NotEmpty
  @Column({
    allowNull: false,
  })
  password!: string

  @Column({
    allowNull: false,
  })
  uid!: string

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  provider!: string

  @Column({
    field: 'deleted_at',
    allowNull: true,
  })
  deletedAt!: Date

  @Column({
    field: 'created_at',
    allowNull: false,
  })
  createdAt!: Date

  @Column({
    field: 'updated_at',
    allowNull: false,
  })
  updatedAt!: Date

  @BeforeCreate
  static setBycriptPassword(instance: User): void {
    instance.password = hashSync(instance.password, 10)
  }

  @BeforeCreate
  static setLowerCase(instance: User): void {
    instance.username = instance.username.toLowerCase()
    instance.email = instance.email.toLowerCase()
  }

  getToken(): string {
    return sign(
      {
        id: this.id,
        email: this.email,
        username: this.username,
      },
      JWT_KEY
    )
  }

  public static createByEmail({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }): User {
    return User.create({
      username,
      email,
      password,
      provider: 'email',
      uid: email,
    })
  }
}
