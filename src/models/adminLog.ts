import { Model } from 'sequelize';

interface AdminLogAttributes{
  id: number;
  admin_id: number;
  action_name: string;
  action_description: string;
}

module.exports = (sequelize: any, DataTypes: any) =>{
  class AdminLog extends Model<AdminLogAttributes> implements AdminLogAttributes

  {
    id!: number;
    admin_id!: number;
    action_name!: string;
    action_description!: string;

    static associate(models: any){
        AdminLog.belongsTo(models.Admin, {
            as: 'admin',
            foreignKey:{
                name: 'admin_id'
            }
        })
    }
  }

  AdminLog.init({
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
    }

  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    modelName: 'AdminLog',
    tableName: 'admin_logs'
  })

  return AdminLog
}


