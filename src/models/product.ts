import { Model } from 'sequelize';

interface ProductAttributes{
  id: number;
  product_name: string;
  product_category_id: number;
  supplier: string;
  quantity: number;
  order_price: number;
  sell_price: number;
  total_order_price: number;
  total_sell_price: number;
}

module.exports = (sequelize: any, DataTypes: any) =>{
  class Product extends Model<ProductAttributes> implements ProductAttributes

  {
    id!: number;
    product_name!: string;
    product_category_id!: number;
    supplier!: string;
    quantity!: number;
    order_price!: number;
    sell_price!: number;
    total_order_price!: number;
    total_sell_price!: number;

    static associate(models: any){
        Product.belongsTo(models.ProductCategory, {
            as: 'product_category',
            foreignKey:{
                name: 'product_category_id'
            }
        })
    }
  }

  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_name:{
      allowNull: false,
      type: DataTypes.STRING
    },
    product_category_id:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    supplier:{
        allowNull: false,
        type: DataTypes.STRING
    },
    quantity:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    order_price:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    sell_price:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    total_order_price:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    total_sell_price:{
        allowNull: false,
        type: DataTypes.INTEGER
    }

  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    modelName: 'Product',
    tableName: 'products'
  })

  return Product
}


