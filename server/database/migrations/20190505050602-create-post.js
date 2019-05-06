'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('posts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
        },
        userId: {
          field: 'user_id',
          allowNull: false,
          type: Sequelize.INTEGER.UNSIGNED,
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'id',
          },
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
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
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          field: 'updated_at',
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      })
      .then(() => queryInterface.addIndex('posts', ['deleted_at']))
      .then(() => queryInterface.addIndex('posts', ['created_at']))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts')
  },
}
