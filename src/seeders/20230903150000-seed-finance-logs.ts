'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('finance_logs', [
      {
        product_id: 11,
        sell_amount: 700000,
        order_amount: 400000,
        profit: 300000,
        created_at: new Date('2025-09-01T10:00:00Z'),
        updated_at: new Date('2025-09-01T10:00:00Z'),
      },
      {
        product_id: 12,
        sell_amount: 2750000,
        order_amount: 2000000,
        profit: 750000,
        created_at: new Date('2025-09-02T10:00:00Z'),
        updated_at: new Date('2025-09-02T10:00:00Z'),
      },
      {
        product_id: 13,
        sell_amount: 2500000,
        order_amount: 1500000,
        profit: 1000000,
        created_at: new Date('2025-09-03T10:00:00Z'),
        updated_at: new Date('2025-09-03T10:00:00Z'),
      },
      {
        product_id: 14,
        sell_amount: 3300000,
        order_amount: 2250000,
        profit: 1050000,
        created_at: new Date('2025-09-04T10:00:00Z'),
        updated_at: new Date('2025-09-04T10:00:00Z'),
      },
      {
        product_id: 15,
        sell_amount: 1500000,
        order_amount: 900000,
        profit: 600000,
        created_at: new Date('2025-09-05T10:00:00Z'),
        updated_at: new Date('2025-09-05T10:00:00Z'),
      },
      {
        product_id: 16,
        sell_amount: 11000000,
        order_amount: 7500000,
        profit: 3500000,
        created_at: new Date('2025-09-06T10:00:00Z'),
        updated_at: new Date('2025-09-06T10:00:00Z'),
      },
      {
        product_id: 17,
        sell_amount: 12000000,
        order_amount: 7500000,
        profit: 4500000,
        created_at: new Date('2025-09-07T10:00:00Z'),
        updated_at: new Date('2025-09-07T10:00:00Z'),
      },
      {
        product_id: 18,
        sell_amount: 5500000,
        order_amount: 3500000,
        profit: 2000000,
        created_at: new Date('2025-09-08T10:00:00Z'),
        updated_at: new Date('2025-09-08T10:00:00Z'),
      },
      {
        product_id: 19,
        sell_amount: 5200000,
        order_amount: 3600000,
        profit: 1600000,
        created_at: new Date('2025-09-09T10:00:00Z'),
        updated_at: new Date('2025-09-09T10:00:00Z'),
      },
      {
        product_id: 20,
        sell_amount: 3200000,
        order_amount: 2000000,
        profit: 1200000,
        created_at: new Date('2025-09-10T10:00:00Z'),
        updated_at: new Date('2025-09-10T10:00:00Z'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('finance_logs', null, {});
  },
};
