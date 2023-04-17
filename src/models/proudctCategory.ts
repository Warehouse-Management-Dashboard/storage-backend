import { Model } from 'sequelize';
import { deleteCascadeHandler } from '../utils/deleteCascadeHandler';

interface ProductCategoryAttributes{
  id: number;
  name: string;
  
}

module.exports = (sequelize: any, DataTypes: any) =>{
  class ProductCategory extends Model<ProductCategoryAttributes> implements ProductCategoryAttributes

  {
    id!: number;
    name!: string;

    static associate(models: any){
      ProductCategory.hasMany(models.Product, {
        as: 'products'
      })
    }

    static hook(models: any){
      ProductCategory.afterDestroy(async ({ id }, __) => {
        const associatedModels = [
          'Product'
        ]

        deleteCascadeHandler(models, associatedModels, id, 'product_category_id')
      })
    }
  }

  ProductCategory.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name:{
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    modelName: 'ProductCategory',
    tableName: 'product_categories'
  })

  return ProductCategory
}


