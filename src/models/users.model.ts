import { Model } from 'sequelize';

interface UserAttributes{
  id: number;
  email: string;
  password: string
}

module.exports = (sequelize: any, DataTypes: any) =>{
  class User extends Model<UserAttributes> implements UserAttributes

  {
    id!: number;
    email!: string;
    password!: string;    
  }

  User.init({
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
    modelName: 'User',
    tableName: 'users'
  })

  return User
}


