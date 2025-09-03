'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'product_logs',
      [
        {
          order_amount: 200,
          sell_amount: 150,
          created_at: new Date('2024-01-05'),
          updated_at: new Date('2024-01-05'),
        },
        {
          order_amount: 50,
          sell_amount: 45,
          created_at: new Date('2024-01-10'),
          updated_at: new Date('2024-01-10'),
        },
        {
          order_amount: 100,
          sell_amount: 90,
          created_at: new Date('2024-02-01'),
          updated_at: new Date('2024-02-01'),
        },
        {
          order_amount: 30,
          sell_amount: 20,
          created_at: new Date('2024-02-15'),
          updated_at: new Date('2024-02-15'),
        },
        {
          order_amount: 150,
          sell_amount: 100,
          created_at: new Date('2024-03-01'),
          updated_at: new Date('2024-03-01'),
        },
        {
          order_amount: 5,
          sell_amount: 3,
          created_at: new Date('2024-03-10'),
          updated_at: new Date('2024-03-10'),
        },
        {
          order_amount: 10,
          sell_amount: 8,
          created_at: new Date('2024-03-15'),
          updated_at: new Date('2024-03-15'),
        },
        {
          order_amount: 100,
          sell_amount: 95,
          created_at: new Date('2024-04-01'),
          updated_at: new Date('2024-04-01'),
        },
        {
          order_amount: 8,
          sell_amount: 6,
          created_at: new Date('2024-04-10'),
          updated_at: new Date('2024-04-10'),
        },
        {
          order_amount: 40,
          sell_amount: 30,
          created_at: new Date('2024-04-20'),
          updated_at: new Date('2024-04-20'),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_logs', null, {});
  },
};
