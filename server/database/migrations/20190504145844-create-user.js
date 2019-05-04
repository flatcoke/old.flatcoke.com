'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        provider: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        uid: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isAdmin: {
          field: 'is_admin',
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        deletedAt: {
          field: 'deleted_at',
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: null,
        },
        createdAt: {
          field: 'created_at',
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
        updatedAt: {
          field: 'updated_at',
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal(
            'CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'
          ),
        },
      })
      .then(() => queryInterface.addIndex('users', ['uid', 'provider']))
      .then(() => queryInterface.addIndex('users', ['created_at']))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  },
}
