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
     await queryInterface.addColumn('admins', 'deleted_at', {
      type: DataTypes.DATE
     })
     await queryInterface.addColumn('admin_logs', 'deleted_at', {
      type: DataTypes.DATE
     })
     await queryInterface.addColumn('products', 'deleted_at', {
      type: DataTypes.DATE
     })
     await queryInterface.addColumn('product_categories', 'deleted_at', {
      type: DataTypes.DATE
     })
  },

  down: async (queryInterface: QueryInterface, _: any) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('admins', 'deleted_at')
    await queryInterface.removeColumn('admin_logs', 'deleted_at')
    await queryInterface.removeColumn('products', 'deleted_at')
    await queryInterface.removeColumn('product_categories', 'deleted_at')
  }
};