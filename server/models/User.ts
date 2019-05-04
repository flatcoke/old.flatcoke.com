import {
  Column,
  DataType,
  IsEmail,
  Model,
  NotEmpty,
  Table,
  DefaultScope,
} from 'sequelize-typescript'

@DefaultScope({
  attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
})
@Table({
  tableName: 'users',
  paranoid: true,
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
    unique: true,
  })
  email!: string

  @NotEmpty
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
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
}
