'use strict';
import { QueryInterface } from 'sequelize';
const bcrypt = require('bcrypt');
const path = require('path');

// Force load .env from project root
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  up: async (queryInterface: QueryInterface, _: any) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
    const adminPass = process.env.ADMIN_PASS || 'admin123';
    const saltRounds = parseInt(process.env.SECRET_SALT || '10', 10);

    const hashedPassword = bcrypt.hashSync(adminPass, bcrypt.genSaltSync(saltRounds));

    await queryInterface.bulkInsert('admins', [
      {
        email: adminEmail,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface, _: any) => {
    await queryInterface.bulkDelete('admins', { email: process.env.ADMIN_EMAIL || 'admin@admin.com' });
  },
};
