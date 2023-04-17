import { Model } from 'sequelize';
import { deleteCascadeHandler } from '../utils/deleteCascadeHandler';

interface AdminAttributes{
  id: number;
  email: string;
  password: string
}

module.exports = (sequelize: any, DataTypes: any) =>{
  class Admin extends Model<AdminAttributes> implements AdminAttributes

  {
    id!: number;
    email!: string;
    password!: string;    

    static associate(models: any){
      Admin.hasMany(models.AdminLog, {
        as: 'admin_logs'
      })
    }

    static hook(models: any){
      Admin.afterDestroy(async ({ id }, __) => {
        const associatedModels = [
          'AdminLog'
        ]

        deleteCascadeHandler(models, associatedModels, id, 'admin_id')
      })

    }
  }

  Admin.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email:{
      allowNull: false,
      type: DataTypes.STRING
    },
    password:{
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    modelName: 'Admin',
    tableName: 'admins'
  })

  return Admin
}


