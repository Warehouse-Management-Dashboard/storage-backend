'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
      { name: 'Stationery', created_at: new Date(), updated_at: new Date() },
      { name: 'Electrical', created_at: new Date(), updated_at: new Date() },
      { name: 'Safety Gear', created_at: new Date(), updated_at: new Date() },
      { name: 'Packaging', created_at: new Date(), updated_at: new Date() },
      { name: 'Equipment', created_at: new Date(), updated_at: new Date() },
      { name: 'Storage', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
  },
};
