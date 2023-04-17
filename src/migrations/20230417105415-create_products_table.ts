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
     await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_name:{
        allowNull: false,
        type: DataTypes.STRING
      },
      product_category_id:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      supplier:{
          allowNull: false,
          type: DataTypes.STRING
      },
      quantity:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      order_price:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      sell_price:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      total_order_price:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      total_sell_price:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });

     await queryInterface.addConstraint('products', {
      type: 'foreign key',
      name: 'products_ibfk_1',
      fields:['product_category_id'],
      references:{
        table: 'product_categories',
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
    await queryInterface.removeConstraint('products', 'products_ibfk_1')
    await queryInterface.dropTable('products')
  }
};