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
     await queryInterface.createTable('admin_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      admin_id:{
          allowNull: false,
          type: DataTypes.INTEGER
      },
      action_name:{
          allowNull: false,
          type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE")
      },
      action_description:{
          allowNull: false,
          type: DataTypes.STRING
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

     await queryInterface.addConstraint('admin_logs', {
      type: 'foreign key',
      name: 'admin_logs_ibfk_1',
      fields: ['admin_id'],
      references:{
        table: 'admins',
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
    await queryInterface.removeConstraint('admin_logs', 'admin_logs_ibfk_1')
    await queryInterface.dropTable('admin_logs')
  }
};