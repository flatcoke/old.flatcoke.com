import { genSaltSync, hashSync } from 'bcrypt'
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
import { FacebookUserData } from '../api/auth/index.d'
import { UserPayload } from '../api/users/user'
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
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: {
      name: 'email',
      msg: 'The email already used.',
    },
  })
  email!: string

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
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

  // @BeforeCreate
  // static setBycriptPassword(instance: User): void {
  //   instance.password = hashSync(instance.password, 10)
  // }

  @BeforeCreate
  static setLowerCase(_user: User): void {
    // user.username = user.username.toLowerCase()
    // user.email = user.email.toLowerCase()
  }

  @BeforeCreate
  static setHashPassword(user: User): void {
    user.password = hashSync(user.password, genSaltSync(10))
  }

  getToken(): string {
    return sign(
      {
        id: this.id,
        email: this.email,
        username: this.username,
      },
      JWT_KEY,
    )
  }

  public static createByEmail(userPayload: UserPayload): User {
    return User.create({
      ...userPayload,
      provider: 'email',
      uid: userPayload.email,
    })
  }

  public static findOrCreateByFacebookId(
    facebookUserData: FacebookUserData,
  ): User {
    return User.findOrCreate({
      where: { provider: 'facebook', uid: facebookUserData.id },
      defaults: { password: 'default' },
    })
  }
}
