import { Model } from 'sequelize';

interface ProductLogAttributes{
  id: number;
  order_amount: number;
  sell_amount: number;
  
}

module.exports = (sequelize: any, DataTypes: any) =>{
  class ProductLog extends Model<ProductLogAttributes> implements ProductLogAttributes

  {
    id!: number;
    order_amount!: number;
    sell_amount!: number;

  }

  ProductLog.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    order_amount:{
        allowNull: true,
        type: DataTypes.INTEGER
    },
    sell_amount:{
        allowNull: true,
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    modelName: 'ProductLog',
    tableName: 'product_logs'
  })

  return ProductLog
}


