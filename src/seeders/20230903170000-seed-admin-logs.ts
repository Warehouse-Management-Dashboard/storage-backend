'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'admin_logs',
      [
        {
          admin_id: 1,
          action_name: 'CREATE',
          action_description: 'Created product categories: Stationery, Electrical, Safety Gear, Packaging, Equipment, Storage',
          created_at: new Date('2024-01-01 09:15:23'),
          updated_at: new Date('2024-01-01 09:15:23'),
        },
        {
          admin_id: 1,
          action_name: 'CREATE',
          action_description: 'Inserted 10 dummy products into the system',
          created_at: new Date('2024-01-02 10:30:45'),
          updated_at: new Date('2024-01-02 10:30:45'),
        },
        {
          admin_id: 1,
          action_name: 'CREATE',
          action_description: 'Seeded finance logs for all products',
          created_at: new Date('2024-01-03 14:05:12'),
          updated_at: new Date('2024-01-03 14:05:12'),
        },
        {
          admin_id: 1,
          action_name: 'CREATE',
          action_description: 'Seeded product logs for product stock movements',
          created_at: new Date('2024-01-04 16:22:51'),
          updated_at: new Date('2024-01-04 16:22:51'),
        },
        {
          admin_id: 1,
          action_name: 'UPDATE',
          action_description: 'Updated stock quantities for Ballpoint Pen and A4 Copy Paper',
          created_at: new Date('2024-02-01 11:10:33'),
          updated_at: new Date('2024-02-01 11:10:33'),
        },
        {
          admin_id: 1,
          action_name: 'UPDATE',
          action_description: 'Updated product price for Hand Pallet Truck',
          created_at: new Date('2024-02-10 13:45:20'),
          updated_at: new Date('2024-02-10 13:45:20'),
        },
        {
          admin_id: 1,
          action_name: 'DELETE',
          action_description: 'Deleted product Steel Rack (5 Tier) due to supplier issue',
          created_at: new Date('2024-03-01 09:55:40'),
          updated_at: new Date('2024-03-01 09:55:40'),
        },
        {
          admin_id: 1,
          action_name: 'CREATE',
          action_description: 'Added new finance log entry for Barcode Scanner',
          created_at: new Date('2024-03-15 15:12:09'),
          updated_at: new Date('2024-03-15 15:12:09'),
        },
        {
          admin_id: 1,
          action_name: 'UPDATE',
          action_description: 'Adjusted sell prices for Safety Helmet and Nitrile Gloves',
          created_at: new Date('2024-04-01 10:40:55'),
          updated_at: new Date('2024-04-01 10:40:55'),
        },
        {
          admin_id: 1,
          action_name: 'DELETE',
          action_description: 'Removed outdated finance log entry for Shrink Wrap Roll',
          created_at: new Date('2024-04-20 18:25:37'),
          updated_at: new Date('2024-04-20 18:25:37'),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin_logs', null, {});
  },
};
