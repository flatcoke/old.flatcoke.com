import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  Model,
  NotEmpty,
  Table,
} from 'sequelize-typescript'

import { User } from './User'

@DefaultScope({
  limit: 10,
})
@Table({
  tableName: 'posts',
  paranoid: true,
})
export class Post extends Model<Post> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number

  @BelongsTo(() => User, 'user_id')
  user!: User

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string

  @Column({
    type: DataType.TEXT,
  })
  content?: string

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
