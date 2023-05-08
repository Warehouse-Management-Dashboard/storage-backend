import { Model } from 'sequelize';

interface FinanceLogAttributes{
  id: number;
  product_id: number;
  sell_amount: number;
  order_amount: number;
  profit: number
  
}

module.exports = (sequelize: any, DataTypes: any) =>{
  class FinanceLog extends Model<FinanceLogAttributes> implements FinanceLogAttributes

  {
    id!: number;
    product_id!: number;
    sell_amount!: number;
    order_amount!: number;
    profit!: number

    static associate(models: any){
        FinanceLog.belongsTo(models.Product, {
            as: 'product',
            foreignKey:{
                name: 'product_id'
            }
        })
    }
  }


  FinanceLog.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_id:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    sell_amount:{
        allowNull: true,
        type: DataTypes.INTEGER
    },
    order_amount: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    profit:{
        allowNull: true,
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    modelName: 'FinanceLog',
    tableName: 'finance_logs'
  })

  return FinanceLog
}


