module.exports = {
  development: {
    username: 'cola',
    password: 'qwer1234',
    database: 'flatcoke',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  session: {
    secret: process.env.PRODUCTION_SECRET || 'placeholdersecret',
  },
}
