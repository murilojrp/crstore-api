import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const Address = sequelize.define(
  'adresses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    street: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    number: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Address.belongsTo(User, {
    as: 'user',
    foreignKey: {
        name: 'idUser',
        allowNull: false,
        field: 'id_user'
    }
});

export default Address;
