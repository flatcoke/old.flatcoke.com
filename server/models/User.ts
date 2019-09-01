import { genSaltSync, hashSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
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
import {
  FacebookAccessTokenData,
  JWTToken,
  IAuthCredentials,
} from '../api/auth/index.d'
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

  getJWTToken(): JWTToken {
    return User.generateJWTToken(this)
  }

  private static generateJWTToken({
    id,
    username,
    email,
    createdAt,
  }: {
    id: number
    username: string | null
    email: string | null
    createdAt: Date
  }): JWTToken {
    const Token: JWTToken = {
      accessToken: sign(
        {
          id: id,
          email: email,
          username: username,
          createdAt: createdAt,
        },
        JWT_KEY,
        { expiresIn: '20m' },
      ),
      refreshToken: sign(
        {
          id: id,
        },
        JWT_KEY,
        { expiresIn: '30days' },
      ),
    }
    return Token
  }

  public static createByEmail(userPayload: UserPayload): Promise<User> {
    return User.create({
      ...userPayload,
      provider: 'email',
      uid: userPayload.email,
    })
  }

  public static generateJWTTokenByRefreshToken(refreshToken: string): JWTToken {
    return User.generateJWTToken(verify(
      refreshToken,
      JWT_KEY,
    ) as IAuthCredentials)
  }

  public static findOrCreateByFacebookId(
    facebookUser: FacebookAccessTokenData,
  ): Promise<[User, boolean]> {
    return User.findOrCreate({
      where: { provider: 'facebook', uid: facebookUser.id },
      defaults: {
        password: 'default',
        username: facebookUser.name.replace(/\s/g, ''),
        email: facebookUser.email,
      },
    })
  }
}
