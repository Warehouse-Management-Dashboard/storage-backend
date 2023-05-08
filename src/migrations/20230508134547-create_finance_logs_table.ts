'use strict';
import { DataTypes, QueryInterface} from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface, _: any) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('finance_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      sell_amount:{
          allowNull: true,
          type: DataTypes.INTEGER
      },
      order_amount: {
          allowNull: true,
          type: DataTypes.INTEGER
      },
      profit:{
          allowNull: true,
          type: DataTypes.INTEGER
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    });

    await queryInterface.addConstraint('finance_logs', {
      type: 'foreign key',
      name: 'finance_logs_ibfk_1',
      fields: ['product_id'],
      references:{
        table: 'products',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface: QueryInterface, _: any) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('finance_logs', 'finance_logs_ibfk_1')
    await queryInterface.dropTable('finance_logs')
  }
};