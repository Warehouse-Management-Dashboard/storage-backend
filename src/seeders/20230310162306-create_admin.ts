'use strict';
import { QueryInterface } from 'sequelize'
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
  up: async (queryInterface: QueryInterface, _: any) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
     * 
    */   
    await queryInterface.bulkInsert('admins', [{
      email: "admin@admin.com",
      password: bcrypt.hashSync(process.env.ADMIN_PASS, bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT))),
      created_at: new Date(),
      updated_at: new Date()
    }]) 
    // bcrypt.hash(process.env.ADMIN_PASS, 10, async (err: any, hash: any) => {
    //   try{
    //     console.log("Test")
        
    //   }catch(err){
    //     console.log("Something broke")
    //   }
      
    // })
  },

  down: async (queryInterface: QueryInterface, _: any) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('sellers', {email: 'admin@admin.com'})
  }
};