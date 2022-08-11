import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Item from "./Item";
import User from "./User";

const Cart = sequelize.define(
  'cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Cart.belongsTo(User, {
    as: 'user',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idUser',
        allowNull: true,
        field: 'id_user'
    }
});

Cart.belongsTo(Item, {
  as: 'item',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
      name: 'idItem',
      allowNull: false,
      field: 'id_item'
  }
});

export default Cart;
