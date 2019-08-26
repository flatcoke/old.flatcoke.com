import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  dialect: 'mysql',
  operatorsAliases: Op,
  database: process.env.DATABASE || 'flatcoke',
  username: process.env.USERNAME || 'cola',
  password: process.env.PASSWORD || 'qwer1234',
  models: [__dirname + '/../models'],
})
